import React, { useContext, useMemo } from "react"
import { Editor, EditorState } from "draft-js"
import { createDecorator } from "@/lib/addEntity/editorDecorators"
import { EditorContext } from "@contexts/EditorContext"
import useAutoSaveEditorContent from "@hooks/AutoSaveEditorContent"
import { useProject } from "@contexts/ProjectContext"

export default function DraftEditor() {
	const { editorState, updateEditorState } = useContext(EditorContext)
	const { projectState } = useProject()

	// Auto-save the editor content when user stops typing for 2 seconds
	useAutoSaveEditorContent(projectState.scene_id)

	const decorator = useMemo(() => {
		const entityDisplayTexts = {
			// ... your state object
		}
		return createDecorator(entityDisplayTexts)
	}, [])

	const decoratedEditorState = useMemo(() => {
		return EditorState.set(editorState, { decorator })
	}, [editorState, decorator])

	return (
		<div className='text-editor'>
			<Editor editorState={decoratedEditorState} onChange={updateEditorState} />
		</div>
	)
}
