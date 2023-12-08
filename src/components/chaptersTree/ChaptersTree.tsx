import React, { useState, useRef } from "react"
import { useProject } from "@contexts/ProjectContext"
import { useEditor } from "@contexts/EditorContext"
import { IChapter, IProject } from "@customTypes/databaseTypes"
import { ScenesMap } from "@/customTypes/projectContextTypes"
import { useGetProjectData } from "./useGetProjectData"
import ChapterBlock from "./ChapterBlock"
import ChaptersOptions from "./ChaptersOptions"
import {
	handleSetChapters,
	handleSceneClick,
	handleMenuToggle,
	handleAddChapter,
	handleEditChapter,
} from "./chaptersTreeUtilities"
import { updateName, Type } from "@lib/dexie/queries/updateName"
import useOutsideClickHandler from "./useOutsideClickHandler"

const ChaptersTree = () => {
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

	useGetProjectData(
		projectState,
		setProjectData,
		(newChapters) => setChapters(handleSetChapters(newChapters)),
		setScenes
	)
	useOutsideClickHandler(menuRefs, () => setActiveMenu(""))

	const handleBlur = async () => {
		if (editableChapterId && editableText) {
			await handleEditChapter(
				editableChapterId,
				editableText,
				chapters,
				setChapters
			)
		}
		setEditableChapterId(null)
	}

	return (
		<>
			<h2>{projectData?.name ?? "No Title Found"}</h2>
			<div>
				{chapters.map((chapter) => (
					<div key={chapter.id}>
						<ChaptersOptions
							chapterId={chapter.id}
							activeMenu={activeMenu}
							setActiveMenu={setActiveMenu}
							handleEditChapter={() => {
								setEditableChapterId(chapter.id)
								setEditableText(chapter.name)
							}}
							handleAddChapter={handleAddChapter}
							projectState={projectState}
						/>
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
