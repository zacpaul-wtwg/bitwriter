import React, { useContext } from "react"
import { EditorContext } from "@contexts/EditorContext" // Adjust the import path as needed
import { convertToRaw } from "draft-js"

const DisplayEditorState = () => {
	const { editorState } = useContext(EditorContext)

	// Function to convert the editor's content to a raw format
	const getRawContent = (editorState) => {
		const currentContent = editorState.getCurrentContent()
		return JSON.stringify(convertToRaw(currentContent), null, 2) // Converts to raw format and then to a formatted JSON string
	}
	const selectionState = editorState.getSelection()
	const anchorKey = selectionState.getAnchorKey()
	const currentContent = editorState.getCurrentContent()
	const currentContentBlock = currentContent.getBlockForKey(anchorKey)
	const start = selectionState.getStartOffset()
	const end = selectionState.getEndOffset()
	const selectedText = currentContentBlock.getText().slice(start, end)

	console.log("anchorKey: ", anchorKey)
	console.log("currentContentBlock: ", currentContentBlock)
	console.log("start: ", start)
	console.log("end: ", end)
	console.log("selectedText: ", selectedText)

	console.log("tojs", selectionState.toJS())

	const contentState = editorState.getCurrentContent()

	console.log("get block map", contentState.getBlockMap())

	const editorContentAsRawJson = getRawContent(editorState)
	const array = JSON.parse(editorContentAsRawJson)
	const lastText = array.blocks[array.blocks.length - 1].text
	console.log(editorContentAsRawJson)

	return (
		<>
			<span>{lastText}</span>
		</>
	)
}

export default DisplayEditorState
