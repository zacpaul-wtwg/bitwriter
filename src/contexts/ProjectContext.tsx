import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
	FC,
} from "react"
import { getLocalStorage, setLocalStorage } from "@lib/fetch/localStorageUtils"

interface Project {
	project_id: number
	chapter_id: number
	scene_id: number
}

interface ProjectContextType {
	projectState: Project
	setProjectState: (project: Project) => void
	updateProjectState: (
		project_id: number,
		chapter_id: number,
		scene_id: number
	) => void
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
	const [projectState, setProjectState] = useState<Project>(() => {
		return getLocalStorage("projectState")
	})

	// Function to update project state and local storage
	const updateProjectState = (
		project_id: number,
		chapter_id: number,
		scene_id: number
	) => {
		const updatedProject = { project_id: project_id, chapter_id, scene_id }
		setProjectState(updatedProject) // Update context state
		setLocalStorage("projectState", updatedProject) // Update local storage
	}

	useEffect(() => {
		setLocalStorage("projectState", projectState) // Keep local storage in sync
	}, [projectState])

	return (
		<ProjectContext.Provider
			value={{ projectState, setProjectState, updateProjectState }}
		>
			{children}
		</ProjectContext.Provider>
	)
}
