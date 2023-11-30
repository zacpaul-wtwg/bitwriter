// src/components/chaptersTree/ChaptersTree.tsx

import React, { useEffect, useState } from "react"
import { useProject } from "@contexts/ProjectContext"
import { useEditor } from "@contexts/EditorContext"
import { IProject, IChapter, IScene } from "@customTypes/databaseTypes"
import saveEditorContent from "@lib/editorLocalSave/saveEditorContent"
import { ScenesMap } from "@/customTypes/projectContextTypes"
import { useGetProjectData } from "./useGetProjectData"

export const ChaptersTree = () => {
	const [chapters, setChapters] = useState<IChapter[]>([])
	const [projectData, setProjectData] = useState<IProject>()
	const [scenes, setScenes] = useState<ScenesMap>({})
	const { projectState, setProjectState } = useProject()
	const { editorState } = useEditor()

	useGetProjectData(projectState, setProjectData, setChapters, setScenes)

	const handleSceneClick = (scene: IScene) => {
		if (projectState) {
			saveEditorContent(editorState, projectState.scene_id)
			setProjectState({
				...projectState,
				chapter_id: scene.chapter_id,
				scene_id: scene.id,
			})
		}
	}

	return (
		<>
			<h2>{projectData?.name ?? "No Title Found"}</h2>
			<div>
				{chapters.length ? (
					chapters.map((chapter) => (
						<div key={chapter.id}>
							<h3>{chapter.name}</h3>
							<ul>
								{scenes[chapter.id] &&
									scenes[chapter.id].map((scene: IScene) => (
										<li
											key={scene.id}
											onClick={() => handleSceneClick(scene)}
											className={
												projectState.scene_id === scene.id
													? "current-scene"
													: ""
											}
										>
											{scene.name}
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
