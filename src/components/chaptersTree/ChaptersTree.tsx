import React, { useState } from "react"
import { useProject } from "@contexts/ProjectContext"
import { useEditor } from "@contexts/EditorContext"
import { IProject, IChapter, IScene } from "@customTypes/databaseTypes"
import saveEditorContent from "@lib/editorLocalSave/saveEditorContent"
import { ScenesMap } from "@/customTypes/projectContextTypes"
import { useGetProjectData } from "./useGetProjectData"
import { addChapter } from "./handleChapterActions" // Import the addChapter function

export const ChaptersTree = () => {
	const [chapters, setChapters] = useState<IChapter[]>([])
	const [projectData, setProjectData] = useState<IProject>()
	const [scenes, setScenes] = useState<ScenesMap>({})
	const { projectState, setProjectState } = useProject()
	const { editorState } = useEditor()

	// Function to handle setting and sorting chapters
	const handleSetChapters = (newChapters) => {
		const sortedChapters = newChapters.sort((a, b) => a.order - b.order)
		setChapters(sortedChapters)
	}

	// Fetch project data and use handleSetChapters to set chapters
	useGetProjectData(projectState, setProjectData, handleSetChapters, setScenes)

	const [showMenu, setShowMenu] = useState<{ [key: string]: boolean }>({})

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

	const handleMenuToggle = (chapterId: string) => {
		setShowMenu((prev) => ({ ...prev, [chapterId]: !prev[chapterId] }))
	}

	const handleAddChapter = async (
		chapterId: string,
		placement: "before" | "after"
	) => {
		if (typeof projectState.project_id === "undefined") {
			throw new Error("Project state is undefined")
		}
		await addChapter(projectState.project_id, chapterId, placement)
	}

	return (
		<>
			<h2>{projectData?.name ?? "No Title Found"}</h2>
			<div>
				{chapters.length ? (
					chapters.map((chapter) => (
						<div key={chapter.id} className='chapter-block'>
							<span
								className='options'
								onClick={() => handleMenuToggle(chapter.id)}
							>
								...
							</span>
							<h3>
								{chapter.name}
								{/* TODO: replace with icon component */}
							</h3>
							{showMenu[chapter.id] && (
								<div>
									<button
										onClick={() => {
											handleAddChapter(chapter.id, "before")
										}}
									>
										Add Chapter Before
									</button>
									<button onClick={() => handleAddChapter(chapter.id, "after")}>
										Add Chapter After
									</button>
								</div>
							)}
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
				h3,
				h4,
				h5,
				h6 {
					white-space: nowrap;
					margin: 0px;
				}
				.chapter-block {
					background-color: var(--main-background-dark);
					border: 1px solid var(--gray-medium);
					padding: 0px 10px 10px 10px;
					border-radius: 10px;
					margin-bottom: 10px;
					overflow: hidden;
				}
				ul {
					list-style: none;
					padding: 0;
					margin: 0;
				}
				li {
					padding: 0px 12px;
					border-radius: 4px;
					cursor: pointer;
					white-space: nowrap;
				}
				li:hover {
					color: white;
					background-color: var(--gray-medium);
				}
				.current-scene,
				li:hover.current-scene {
					color: var(--main-background-dark);
					background-color: var(--gray-light);
					font-weight: 700;
				}
				.options {
					cursor: pointer;
					color: var(--gray-light);
					font-weight: 900;
					font-size: 1em;
				}
			`}</style>
		</>
	)
}
