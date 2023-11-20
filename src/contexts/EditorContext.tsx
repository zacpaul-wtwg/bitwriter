import React, {
	createContext,
	useState,
	useCallback,
	useContext,
	ReactNode,
} from "react"
import { EditorState, ContentState } from "draft-js"

// Define the context type
export interface EditorContextType {
	editorState: EditorState
	updateEditorState: (newState: EditorState) => void
	setContent: (content: string) => void
}

// Create the context
export const EditorContext = createContext<EditorContextType | undefined>(
	undefined
)

// Define the props for the provider component
interface EditorProviderProps {
	children: ReactNode
}

// Create the provider component
export const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty())

	const updateEditorState = useCallback((newState: EditorState) => {
		setEditorState(newState)
	}, [])

	const setContent = useCallback((content: string) => {
		const contentState = ContentState.createFromText(content)
		const newEditorState = EditorState.createWithContent(contentState)
		setEditorState(newEditorState)
	}, [])

	return (
		<EditorContext.Provider
			value={{ editorState, updateEditorState, setContent }}
		>
			{children}
		</EditorContext.Provider>
	)
}

// Create a custom hook for using the context
export const useEditor = () => {
	const context = useContext(EditorContext)
	if (context === undefined) {
		throw new Error("useEditor must be used within an EditorProvider")
	}
	return context
}
