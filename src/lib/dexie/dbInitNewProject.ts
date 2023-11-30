// src/lib/dexie/dbInitNewProject.ts

import { db } from './db';
import fetchUserInfo from '../fetch/fetchUserInfo';
import { EditorState } from 'draft-js';
import { convertToRaw } from 'draft-js';
import { ProjectState } from '@customTypes/projectContextTypes';
import setProjectStateUtility from '../utils/setProjectStateUtility';

export async function initializeNewProject(
    project_title: string, 
    setProjectState: (projectState: ProjectState) => void
) {
    try {
        const userInfo = await fetchUserInfo();
        console.log("user id: ", userInfo.data.user.id);
        console.log("Initializing sample data...");
        // Create an empty EditorState
        const emptyEditorState = EditorState.createEmpty();

        // Convert the EditorState to raw content
        const rawContent = JSON.stringify(convertToRaw(emptyEditorState.getCurrentContent()));


        // @ts-ignore
        const project_id = await db.projects.add({
            name: project_title,
            user_id: userInfo.data.user.id,
            last_modified: new Date(),
        }) as string;

        // @ts-ignore
        const chapter_id = await db.chapters.add({
            project_id: project_id,
            user_id: userInfo.data.user.id,
            name: "Chapter 1",
            order: 1,
            last_modified: new Date(),
        });

        
        await db.scenes.add({
            name: "Scene 1", 
            content: rawContent,
            order: 1,
            version: 1, 
            last_modified: new Date(),
            //@ts-ignore
            project_id: project_id,
            //@ts-ignore
            chapter_id: chapter_id,
            user_id: userInfo.data.user.id,
        });
        await setProjectStateUtility(project_id, setProjectState);
        console.log("Sample data initialized:", project_id);
        
        return project_id;
    } catch (err) {
        console.error('Error initializing project:', err);
        throw new Error('Failed to initialize the project.');
    }
}
