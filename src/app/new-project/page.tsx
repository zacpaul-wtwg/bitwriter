// src/app/page.tsx
"use client"
import NewProjectForm from "@components/createNewProject/NewProjectForm"
import React from "react"

const NewProject: React.FC = () => {
	return (
		<>
			<NewProjectForm />{" "}
		</>
	)
}

export default NewProject
