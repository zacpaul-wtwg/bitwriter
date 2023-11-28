// src/components/NewProjectForm.tsx
"use client"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { initializeNewProject } from "@dexie/dbInitNewProject" // Adjust the import path as needed
import { useProject } from "@contexts/ProjectContext" // Import useProject
//FIXME: need to unset editorState and projectState on submit.
const NewProjectForm = () => {
	const [projectTitle, setProjectTitle] = useState("")
	const [chapterTitle, setChapterTitle] = useState("")
	const [sceneTitle, setSceneTitle] = useState("")
	const [message, setMessage] = useState("")
	const [isError, setIsError] = useState(false)
	const [isProjectCreated, setIsProjectCreated] = useState(false)
	const { setProjectState } = useProject() // Use the useProject hook
	const router = useRouter() // Use Next.js Router
	useEffect(() => {
		if (isProjectCreated) {
			router.push("/") // Navigate to the root path
		}
	}, [isProjectCreated, router])

	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsError(false)
		try {
			const projectId = await initializeNewProject(
				projectTitle,
				chapterTitle,
				sceneTitle
			)
			setProjectState({
				project_id: projectId,
				chapter_id: 1, // Assuming default chapter_id
				scene_id: 1, // Assuming default scene_id
			})
			setIsProjectCreated(true)
			setMessage("Project created successfully!")
		} catch (error) {
			setIsError(true)
			setMessage("Error creating new project: " + error.message)
		}
	}

	return (
		<div className='container'>
			<form onSubmit={handleSubmit}>
				<div className='inputGroup'>
					<label>Project Title:</label>
					<input
						type='text'
						value={projectTitle}
						onChange={(e) => setProjectTitle(e.target.value)}
					/>
				</div>
				<div className='inputGroup'>
					<label>Chapter Title:</label>
					<input
						type='text'
						value={chapterTitle}
						onChange={(e) => setChapterTitle(e.target.value)}
					/>
				</div>
				<div className='inputGroup'>
					<label>Scene Title:</label>
					<input
						type='text'
						value={sceneTitle}
						onChange={(e) => setSceneTitle(e.target.value)}
					/>
				</div>
				<button type='submit'>Create New Project</button>
			</form>
			{message && (
				<p className={isError ? "errorMessage" : "successMessage"}>{message}</p>
			)}
			<style jsx>{`
				.container {
					padding: 20px;
					background-color: var(--main-background);
					color: var(--gray-light);
					border-radius: 8px;
					box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
				}
				form {
					display: flex;
					flex-direction: column;
					gap: 15px;
				}
				.inputGroup {
					display: flex;
					flex-direction: column;
					gap: 5px;
				}
				label {
					font-weight: bold;
				}
				input {
					padding: 10px;
					border-radius: 4px;
					border: 1px solid var(--gray-medium);
					background-color: var(--main-background-dark);
					color: var(--gray-light);
				}
				button {
					padding: 10px 20px;
					background-color: var(--main-accent);
					color: white;
					border: none;
					border-radius: 4px;
					cursor: pointer;
				}
				.errorMessage {
					color: var(--error);
				}
				.successMessage {
					color: var(--success);
				}
			`}</style>
		</div>
	)
}

export default NewProjectForm
