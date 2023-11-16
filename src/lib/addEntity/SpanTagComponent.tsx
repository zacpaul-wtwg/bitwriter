import React, { useContext } from "react"
import { EditorState, SelectionState } from "draft-js"
import { EditorContext } from "@contexts/EditorContext" // Adjust the import path as needed

const DoneTagComponent = ({ entityKey, contentState, entityDisplayTexts }) => {
	// Fetch the entity using the entityKey
	const entity = contentState.getEntity(entityKey)
	const { editorState, updateEditorState } = useContext(EditorContext) // Fetching from context

	// Use the entityKey to access specific display text from entityDisplayTexts
	const displayText = entityDisplayTexts[entityKey]?.displayed || "Default Text"

	const handleClick = (event) => {
		event.preventDefault()

		// Iterate over all blocks to find the one containing the entity
		const contentState = editorState.getCurrentContent()
		let entityRange
		let blockKey

		contentState.getBlockMap().forEach((block) => {
			block.findEntityRanges(
				(character) => character.getEntity() === entityKey,
				(start, end) => {
					entityRange = { start, end }
					blockKey = block.getKey()
				}
			)
		})

		// Check if entityRange and blockKey are found and set cursor position after the entity
		if (entityRange && blockKey) {
			const newSelection = SelectionState.createEmpty(blockKey).merge({
				anchorOffset: entityRange.end,
				focusOffset: entityRange.end,
			})

			// Update the EditorState with the new selection
			const newEditorState = EditorState.forceSelection(
				editorState,
				newSelection
			)
			updateEditorState(newEditorState)
		}
	}

	return (
		<span
			className='added'
			data-id={entityKey}
			contentEditable={false}
			onClick={handleClick}
		>
			{displayText}
		</span>
	)
}

export default React.memo(DoneTagComponent)
