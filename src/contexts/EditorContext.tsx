import React, { createContext, useState, useCallback, ReactNode } from "react"
import { EditorState } from "draft-js"

// Explicitly define the context type
export interface EditorContextType {
	editorState: EditorState
	updateEditorState: (newState: EditorState) => void
}

export const EditorContext = createContext<EditorContextType>({
	editorState: EditorState.createEmpty(),
	updateEditorState: () => {},
})

interface EditorProviderProps {
	children: ReactNode
}

export const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty())

	const updateEditorState = useCallback((newState: EditorState) => {
		setEditorState(newState)
	}, [])

	return (
		<EditorContext.Provider value={{ editorState, updateEditorState }}>
			{children}
		</EditorContext.Provider>
	)
}
