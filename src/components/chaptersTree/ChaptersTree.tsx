import React, { useState, useRef, useEffect } from "react"
import { useProject } from "@contexts/ProjectContext"
import { useEditor } from "@contexts/EditorContext"
import { IChapter, IScene, IProject } from "@customTypes/databaseTypes"
import { ScenesMap } from "@/customTypes/projectContextTypes"
import { useGetProjectData } from "./useGetProjectData"
import ChapterBlock from "./ChapterBlock"
import {
	handleMenuToggle,
	handleSceneClick,
	handleAddChapter,
} from "./chaptersTreeUtilities"
import useOutsideClickHandler from "./useOutsideClickHandler"
import { updateName, Type } from "@lib/dexie/queries/updateName"

export const ChaptersTree = () => {
	const [chapters, setChapters] = useState<IChapter[]>([])
	const [projectData, setProjectData] = useState<IProject>()
	const [scenes, setScenes] = useState<ScenesMap>({})
	const { projectState, setProjectState } = useProject()
	const { editorState } = useEditor()
	const [activeMenu, setActiveMenu] = useState<string>("")
	const menuRefs = useRef(new Map<string, HTMLDivElement>())
	const [editableChapterId, setEditableChapterId] = useState<string | null>(
		null
	)
	const [editableText, setEditableText] = useState("")
	//FIXME: fix implicit "any" type
	const handleSetChapters = (newChapters) => {
		const sortedChapters = newChapters.sort((a, b) => a.order - b.order)
		setChapters(sortedChapters)
	}

	const handleEditChapter = (chapterId: string) => {
		setEditableChapterId(chapterId)
		const chapterToEdit = chapters.find((chapter) => chapter.id === chapterId)
		if (chapterToEdit) {
			setEditableText(chapterToEdit.name)
		}
	}

	const handleBlur = async () => {
		if (editableChapterId && editableText) {
			await updateName(Type.Chapter, {
				id: editableChapterId,
				name: editableText,
			})
			setChapters(
				chapters.map((chapter) =>
					chapter.id === editableChapterId
						? { ...chapter, name: editableText }
						: chapter
				)
			)
		}
		setEditableChapterId(null)
	}

	useGetProjectData(projectState, setProjectData, handleSetChapters, setScenes)
	useOutsideClickHandler(menuRefs, () => setActiveMenu(""))

	return (
		<>
			<h2>{projectData?.name ?? "No Title Found"}</h2>
			<div>
				{chapters.map((chapter) => (
					<div key={chapter.id}>
						<span
							className='options-dots'
							onClick={() =>
								handleMenuToggle(chapter.id, activeMenu, setActiveMenu)
							}
						>
							{activeMenu === chapter.id && (
								<div
									className='chapter-menu'
									ref={(el) => {
										if (el) {
											menuRefs.current.set(chapter.id, el)
										} else {
											menuRefs.current.delete(chapter.id)
										}
									}}
								>
									<button
										className='menu-item'
										onClick={() => handleEditChapter(chapter.id)}
									>
										Edit Chapter
									</button>
									<button
										onClick={() =>
											handleAddChapter(
												chapter.id,
												"before",
												projectState,
												setActiveMenu
											)
										}
									>
										Add Chapter Before
									</button>
									<button
										onClick={() =>
											handleAddChapter(
												chapter.id,
												"after",
												projectState,
												setActiveMenu
											)
										}
									>
										Add Chapter After
									</button>
								</div>
							)}
							...
						</span>
						<ChapterBlock
							chapterId={chapter.id}
							chapterName={chapter.name}
							scenes={scenes[chapter.id] ?? []}
							handleSceneClick={(scene) =>
								handleSceneClick(
									scene,
									projectState,
									setProjectState,
									editorState
								)
							}
							currentSceneId={projectState.scene_id}
							editableChapterId={editableChapterId}
							editableText={editableText}
							setEditableText={setEditableText}
							handleBlur={handleBlur}
						/>
					</div>
				))}
			</div>
			<style jsx>{`
				.chapter-menu {
					z-index: 1000; /* High z-index */
					font-size: 14px; /* Adjust as needed */
					left: 0; /* Adjust as needed */
					top: 27.5px; /* Adjust as needed */
					position: absolute;
					background: var(--main-background-dark);
					display: flex;
					flex-direction: column;
					padding: 5px;
					border: 1px solid var(--gray-medium);
					box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
					z-index: 1002;
					line-height: 34px;
				}

				.chapter-menu button {
					background-color: var(--main-background-dark);
					padding: 5px 10px;
					cursor: pointer;
					color: var(--gray-light);
					white-space: nowrap;
					border: none;
				}
				.chapter-menu button:hover {
					background-color: var(--gray-medium);
					color: white;
				}
				.options-dots {
					position: relative;
					cursor: pointer;
					width: fit-content;
				}
			`}</style>
		</>
	)
}

export default ChaptersTree
