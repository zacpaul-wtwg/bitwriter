// src/components/DraftEditor.tsx

import React, { useMemo } from "react"
import { Editor, EditorState } from "draft-js"
import { createDecorator } from "@/lib/addEntity/editorDecorators"
import { useEditor } from "@contexts/EditorContext"
import useAutoSaveEditorContent from "@lib/editorLocalSave/useAutoSaveEditorContent"
import { useProject } from "@contexts/ProjectContext"

export default function DraftEditor() {
	const { editorState, updateEditorState } = useEditor()
	const { projectState } = useProject()

	// Auto-save the editor content when user stops typing for 2 seconds
	useAutoSaveEditorContent(projectState?.scene_id)

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
