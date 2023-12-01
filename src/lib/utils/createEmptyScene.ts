// src/lib/utils/createEmptyScene.ts

import { EditorState } from "draft-js"
import { convertToRaw } from "draft-js"

// Create an empty EditorState
const emptyEditorState = EditorState.createEmpty()

// Convert the EditorState to raw content
export const rawContent = () => {
	return JSON.stringify(convertToRaw(emptyEditorState.getCurrentContent()))
}
