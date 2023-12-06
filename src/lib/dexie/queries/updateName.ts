// src/lib/dexie/queries/updateName.ts

import { db } from "@dexie/db"
import { IChapter, IScene } from "@customTypes/databaseTypes"

// Create specific types using Pick
type ChapterIdName = Pick<IChapter, "id" | "name">
type SceneIdName = Pick<IScene, "id" | "name">

// Define an enum for the types
enum Type {
	Chapter = "chapter",
	Scene = "scene",
}

/**
 * Updates the name of a chapter or scene based on the given UUID.
 * @param {Type} type - The type (chapter or scene).
 * @param {ChapterIdName | SceneIdName} item - Object containing id and newName.
 */

async function updateName(
	type: Type,
	item: ChapterIdName | SceneIdName
): Promise<void> {
	switch (type) {
		case Type.Chapter:
			await db.chapters.update(item.id, { name: item.name })
			console.log(`Chapter name updated to '${item.name}'.`)
			break
		case Type.Scene:
			await db.scenes.update(item.id, { name: item.name })
			console.log(`Scene name updated to '${item.name}'.`)
			break
		default:
			throw new Error("Invalid type specified")
	}
}

export { updateName, Type }
