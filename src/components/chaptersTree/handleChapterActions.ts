// src/components/chaptersTree/handleChapterActions.ts
import {
	ChapterPlacement,
	createChapterWithScene,
} from "@dexie/queries/createNewChapter" // Adjust the import path

export const addChapter = async (
	projectId: string,
	chapterId: string,
	placement: "before" | "after"
) => {
	try {
		await createChapterWithScene(
			projectId,
			chapterId,
			ChapterPlacement[placement]
		)
		// Additional logic for refreshing the chapters list or UI updates
	} catch (error) {
		console.error("Error adding chapter: ", error)
		// Handle error appropriately
	}
}
