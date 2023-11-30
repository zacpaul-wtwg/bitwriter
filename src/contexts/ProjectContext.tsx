import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	FC,
} from "react"
import { getLocalStorage, setLocalStorage } from "@lib/fetch/localStorageUtils"
import {
	ProjectState,
	ProjectContextType,
	ProjectProviderProps,
} from "@customTypes/projectContextTypes" // Update the import path as necessary

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export const useProject = () => {
	const context = useContext(ProjectContext)
	if (context === undefined) {
		throw new Error("useProject must be used within a ProjectProvider")
	}
	return context
}

export const ProjectProvider: FC<ProjectProviderProps> = ({ children }) => {
	const [projectState, setProjectState] = useState<ProjectState>(() => {
		return getLocalStorage("projectState")
	})

	const updateProjectState = (newProjectState: ProjectState) => {
		setProjectState(newProjectState)
		setLocalStorage("projectState", newProjectState)
	}

	useEffect(() => {
		setLocalStorage("projectState", projectState)
	}, [projectState])

	return (
		<ProjectContext.Provider
			value={{ projectState, setProjectState, updateProjectState }}
		>
			{children}
		</ProjectContext.Provider>
	)
}
