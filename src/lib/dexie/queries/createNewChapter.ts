import { db } from "@dexie/db" // adjust the import path as needed
import fetchUserInfo from "@fetch/fetchUserInfo"
import { rawContent } from "@utils/createEmptyScene"

export enum ChapterPlacement {
	before = "before",
	after = "after",
}

export async function createChapterWithScene(
	project_id: string,
	chapter_id: string,
	placement: ChapterPlacement
): Promise<void> {
	const userInfo = await fetchUserInfo()

	// Fetch all chapters in the project
	const chapters = await db.chapters.where({ project_id }).sortBy("order")

	// Find the index of the target chapter
	const targetIndex = chapters.findIndex((ch) => ch.id === chapter_id)
	if (targetIndex === -1) {
		throw new Error("Chapter not found")
	}

	// Calculate new chapter's order
	let newOrder
	if (placement === ChapterPlacement.before) {
		newOrder =
			targetIndex === 0
				? chapters[0].order - 1
				: (chapters[targetIndex].order + chapters[targetIndex - 1].order) / 2
	} else {
		newOrder =
			targetIndex === chapters.length - 1
				? chapters[targetIndex].order + 1
				: (chapters[targetIndex].order + chapters[targetIndex + 1].order) / 2
	}

	// Create and add a new chapter
	const newChapter = {
		project_id,
		user_id: userInfo.data.user.id,
		name: "New Chapter",
		order: newOrder,
		last_modified: new Date(),
	}
	// @ts-expect-error : Ids are automatically assigned by the database
	const newChapterId = await db.chapters.add(newChapter)

	if (typeof newChapterId !== "string") {
		throw new Error("Chapter ID must be a string")
	}

	// Create and add a default scene for the new chapter
	const newScene = {
		name: "New Scene", // default scene name
		// TODO: add empty editor content here
		content: rawContent(),
		chapter_id: newChapterId,
		project_id,
		order: 1, // since it's the first scene of the new chapter
		version: 1,
		last_modified: new Date(),
		user_id: userInfo.data.user.id,
	}

	// @ts-expect-error : Ids are automatically assigned by the database
	await db.scenes.add(newScene)
}
