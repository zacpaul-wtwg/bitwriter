import React, { useContext } from "react"
import { EditorState, Modifier, SelectionState } from "draft-js"
import { EditorContext } from "@contexts/EditorContext" // Adjust the import path as needed

const DoneTagButton = () => {
	const { editorState, updateEditorState } = useContext(EditorContext)

	const insertEntity = (entityType, textToInsert) => {
		const selection = editorState.getSelection()
		const contentState = editorState.getCurrentContent()

		// First, insert the text as an entity
		const contentStateWithEntity = contentState.createEntity(
			entityType,
			"IMMUTABLE",
			{}
		)
		const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
		let newContentState = Modifier.insertText(
			contentStateWithEntity,
			selection,
			textToInsert,
			null,
			entityKey
		)

		// Then, insert a space right after the entity
		const entitySelection = selection.merge({
			anchorOffset: selection.getAnchorOffset() + textToInsert.length,
			focusOffset: selection.getAnchorOffset() + textToInsert.length,
		})
		newContentState = Modifier.insertText(
			newContentState,
			entitySelection,
			" ", // Adding a space after the entity
			null,
			null
		)

		// Create a new editor state with the updated content
		let newEditorState = EditorState.push(
			editorState,
			newContentState,
			"insert-characters"
		)

		// Update the selection to be after the inserted text and space
		const newSelection = entitySelection.merge({
			anchorOffset: entitySelection.getFocusOffset(), // +1 for the space
			focusOffset: entitySelection.getFocusOffset(),
		})
		newEditorState = EditorState.forceSelection(newEditorState, newSelection)

		updateEditorState(newEditorState)
	}

	// Usage in your component
	return (
		<button onClick={() => insertEntity("DONE_TAG", "Dynamic Text")}>
			Add Dynamic Entity
		</button>
	)
}

export default DoneTagButton
