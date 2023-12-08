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
							handleEditChapter={() => {
								setEditableChapterId(chapter.id)
								setEditableText(chapter.name)
							}}
							handleAddChapter={(chapterId, position) =>
								handleAddChapter(
									chapterId,
									position,
									projectState,
									setActiveMenu
								)
							}
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
		</>
	)
}

export default ChaptersTree
