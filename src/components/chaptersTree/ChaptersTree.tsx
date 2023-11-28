// src/components/chaptersTree/ChaptersTree.tsx

import React, { useEffect, useState } from "react"
import { useProject } from "@contexts/ProjectContext"
import { fetchChaptersFromDb } from "./fetchChapters"
import { fetchScenesFromDb } from "./fetchScenes"
import { IProject, IChapter, IScene } from "@lib/dexie/interfaces"
import { useEditor } from "@contexts/EditorContext"
import saveEditorContent from "@lib/editorLocalSave/saveEditorContent"
import { fetchProjectFromDb } from "./fetchProject"

export const ChaptersTree = () => {
	const [chapters, setChapters] = useState<IChapter[]>([])
	const [projectData, setProjectData] = useState<IProject>()
	const [scenes, setScenes] = useState<{ [key: number]: IScene[] }>({})
	const { projectState, setProjectState } = useProject()
	const { editorState } = useEditor() // Get the current editor state

	useEffect(() => {
		if (projectState && projectState.project_id) {
			const fetchProjectData = async () => {
				const project = await fetchProjectFromDb(projectState.project_id)
				console.log("project", project)
				if (project !== undefined) {
					setProjectData(project)
				}
			}
			fetchProjectData()
			fetchChaptersFromDb(projectState.project_id)
				.then((fetchedChapters) => {
					setChapters(fetchedChapters)
					return Promise.all(
						fetchedChapters.map((chapter) =>
							fetchScenesFromDb(chapter.chapter_id)
						)
					).then((fetchedScenes) => {
						const scenesMap = fetchedScenes.reduce(
							(acc, scenesForChapter, index) => {
								acc[fetchedChapters[index].chapter_id] = scenesForChapter
								return acc
							},
							{}
						)
						setScenes(scenesMap)
					})
				})
				.catch((error) => {
					console.error("Error fetching chapters or scenes:", error)
				})
		}
	}, [projectState])

	const handleSceneClick = (scene: IScene) => {
		if (projectState) {
			// Save the current content before switching scenes
			saveEditorContent(editorState, projectState.scene_id)
			// Update the project state with the new scene_id
			setProjectState({
				...projectState, // Keep the existing project data
				chapter_id: scene.chapter_id, // Update the chapter_id (if needed)
				scene_id: scene.scene_id, // Update the scene_id
			})
		}
	}

	return (
		<>
			<h2>{projectData?.project_name ?? "No Title Found"}</h2>
			<div>
				{chapters.length ? (
					chapters.map((chapter) => (
						<div key={chapter.chapter_id}>
							<h3>{chapter.chapter_name}</h3>
							<ul>
								{scenes[chapter.chapter_id] &&
									scenes[chapter.chapter_id].map((scene) => (
										<li
											key={scene.scene_id}
											onClick={() => handleSceneClick(scene)}
											className={
												projectState.scene_id === scene.scene_id
													? "current-scene"
													: ""
											}
										>
											{scene.scene_name}
										</li>
									))}
							</ul>
						</div>
					))
				) : (
					<p>No chapters available for this project.</p>
				)}
			</div>
			<style jsx>{`
				ul {
					list-style: none;
					padding: 0;
					margin: 0;
				}
				li {
					padding: 0px 12px;
					width: fit-content;
				}
				li:hover {
					color: white;
					cursor: pointer;
				}
				.current-scene {
					color: var(--main-background-dark);
					background-color: var(--gray-medium);
					font-weight: 700;
					border-radius: 4px;
				}
			`}</style>
		</>
	)
}
