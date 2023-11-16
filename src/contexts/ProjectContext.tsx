// /context/ProjectContext.tsx

import { createContext, useContext, useState, ReactNode, FC } from "react"

interface Project {
	id: string
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
	const [currentProject, setCurrentProject] = useState<Project | null>(null)

	return (
		<ProjectContext.Provider value={{ currentProject, setCurrentProject }}>
			{children}
		</ProjectContext.Provider>
	)
}
