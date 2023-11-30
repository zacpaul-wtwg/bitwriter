// src/hooks/useFetchProjectData.ts

import { useEffect } from 'react';
import { getProjectFromDb } from "@dexie/queries/getProject";
import { getChaptersFromDb } from "@dexie/queries/getChapters";
import { getScenesFromDb } from "@dexie/queries/getScenes";
import { ScenesMap } from "@/customTypes/projectContextTypes";
import { IProject, IChapter } from "@customTypes/databaseTypes";
import { ProjectState } from '@customTypes/projectContextTypes';

export const useGetProjectData = (
    projectState: ProjectState,
    setProjectData: (project: IProject | undefined) => void,
    setChapters: (chapters: IChapter[]) => void,
    setScenes: (scenes: ScenesMap) => void
) => {
    useEffect(() => {
        if (projectState && projectState.project_id) {
            const fetchProjectData = async () => {
                const project = await getProjectFromDb(projectState.project_id);
                if (project !== undefined) {
                    setProjectData(project);
                }
            };

            fetchProjectData();

            let fetchedChapters: IChapter[] = []; // Define fetchedChapters outside the Promise chain

            getChaptersFromDb(projectState.project_id)
                .then((chapters) => {
                    fetchedChapters = chapters; // Assign the fetched chapters here
                    setChapters(chapters);
                    return Promise.all(
                        chapters.map(chapter => getScenesFromDb(chapter.id))
                    );
                })
                .then(fetchedScenes => {
                    const scenesMap = fetchedScenes.reduce((acc, scenesForChapter, index) => {
                        const chapterId = fetchedChapters[index].id; // Now fetchedChapters is in scope
                        acc[chapterId] = scenesForChapter;
                        return acc;
                    }, {} as ScenesMap);
                    setScenes(scenesMap);
                })
                .catch(error => {
                    console.error("Error fetching chapters or scenes:", error);
                });
        }
    }, [projectState, setProjectData, setChapters, setScenes]);
};
