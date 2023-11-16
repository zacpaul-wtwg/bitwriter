import React, { useContext, useMemo } from "react"
import { Editor, EditorState } from "draft-js"
import { createDecorator } from "@/lib/addEntity/editorDecorators"
import { EditorContext } from "@contexts/EditorContext"

export default function DraftEditor() {
	const { editorState, updateEditorState } = useContext(EditorContext)

	const decorator = useMemo(
		() => {
			const entityDisplayTexts = {
				// ... your state object
			}
			return createDecorator(entityDisplayTexts)
		},
		[
			/* dependencies that change entityDisplayTexts */
		]
	)

	const decoratedEditorState = useMemo(() => {
		return EditorState.set(editorState, { decorator })
	}, [editorState, decorator])

	return (
		<div className='text-editor'>
			<Editor editorState={decoratedEditorState} onChange={updateEditorState} />
		</div>
	)
}
