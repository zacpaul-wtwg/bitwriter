// /context/ProjectContext.tsx

import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
	FC,
} from "react"
import { getLocalStorage, setLocalStorage } from "@lib/fetch/localStorageUtils"

interface Project {
	id: number
	name: string
}

interface ProjectContextType {
	currentProject: Project | null
	setCurrentProject: (project: Project | null) => void
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export const useProject = () => {
	const context = useContext(ProjectContext)
	if (context === undefined) {
		throw new Error("useProject must be used within a ProjectProvider")
	}
	return context
}

interface ProjectProviderProps {
	children: ReactNode
}

export const ProjectProvider: FC<ProjectProviderProps> = ({ children }) => {
	const [currentProject, setCurrentProject] = useState<Project | null>(() => {
		// Initialize state with project from local storage if it exists
		return getLocalStorage("currentProject")
	})

	useEffect(() => {
		// Save currentProject to local storage whenever it changes
		setLocalStorage("currentProject", currentProject)
	}, [currentProject])

	return (
		<ProjectContext.Provider value={{ currentProject, setCurrentProject }}>
			{children}
		</ProjectContext.Provider>
	)
}
