import { IScene, IChapter } from "@customTypes/databaseTypes"
import saveEditorContent from "@lib/editorLocalSave/saveEditorContent"
import { addChapter } from "./handleChapterActions"
import { db } from "@dexie/db"
import { Type } from "@lib/dexie/queries/updateName"

// TODO: fix types in this file.

// Sorts chapters by their order and returns the sorted array
export const handleSetChapters = (newChapters: IChapter[]): IChapter[] => {
	const sortedChapters = newChapters.sort((a, b) => a.order - b.order)
	return sortedChapters
}

// Handles clicking on a scene
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

// Toggles the chapter options menu
export const handleMenuToggle = (
	chapterId: string,
	activeMenu: string,
	setActiveMenu: Function
) => {
	setActiveMenu(activeMenu === chapterId ? "" : chapterId)
}

// Adds a chapter before or after an existing chapter
export const handleAddChapter = async (
	chapterId: string,
	placement: "before" | "after",
	projectState,
	setActiveMenu: Function
) => {
	console.log("handleAddChapter was called")
	if (typeof projectState.project_id === "undefined") {
		throw new Error("Project state is undefined")
	}
	await addChapter(projectState.project_id, chapterId, placement)
	setActiveMenu("") // Close menu after action
}

// Updates the name of a chapter
export const handleEditChapter = async (
	chapterId: string,
	newName: string,
	chapters: IChapter[],
	setChapters: React.Dispatch<React.SetStateAction<IChapter[]>>
) => {
	await db.chapters.update(chapterId, { name: newName })
	const updatedChapters = chapters.map((chapter) =>
		chapter.id === chapterId ? { ...chapter, name: newName } : chapter
	)
	setChapters(updatedChapters)
}
