// src/components/chaptersTree/chaptersTreeUtilities.ts
import { IScene, IChapter } from "@customTypes/databaseTypes"
import saveEditorContent from "@lib/editorLocalSave/saveEditorContent"
import { addChapter } from "./handleChapterActions"

// TODO: fix types

export const handleSetChapters = (newChapters: IChapter[]) => {
	const sortedChapters = newChapters.sort((a, b) => a.order - b.order)
	return sortedChapters
}

export const handleSceneClick = (
	scene: IScene,
	projectState,
	setProjectState,
	editorState
) => {
	if (projectState) {
		saveEditorContent(editorState, projectState.scene_id)
		setProjectState({
			...projectState,
			chapter_id: scene.chapter_id,
			scene_id: scene.id,
		})
	}
}

export const handleMenuToggle = (
	chapterId: string,
	activeMenu: string,
	setActiveMenu: Function
) => {
	setActiveMenu(activeMenu === chapterId ? "" : chapterId)
}

export const handleAddChapter = async (
	chapterId: string,
	placement: "before" | "after",
	projectState,
	setActiveMenu: Function
) => {
	if (typeof projectState.project_id === "undefined") {
		throw new Error("Project state is undefined")
	}
	await addChapter(projectState.project_id, chapterId, placement)
	setActiveMenu("") // Close menu after action
}
