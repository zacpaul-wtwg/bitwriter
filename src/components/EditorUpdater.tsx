import React, { useEffect } from "react"
import { useProject } from "@contexts/ProjectContext"
import { useEditor } from "@contexts/EditorContext"
import { db } from "@lib/dexie/db"
import { convertFromRaw, EditorState } from "draft-js"

const EditorUpdater = () => {
	const { projectState } = useProject()
	const { updateEditorState } = useEditor()

	useEffect(() => {
		if (projectState && projectState.scene_id) {
			// Fetch the scene content
			db.scenes
				.get(projectState.scene_id)
				.then((scene) => {
					if (scene && scene.scene_content) {
						try {
							// Parse the string to an object
							const contentState = convertFromRaw(
								JSON.parse(scene.scene_content)
							)
							const newEditorState = EditorState.createWithContent(contentState)
							updateEditorState(newEditorState)
						} catch (error) {
							console.error("Error parsing scene content:", error)
						}
					}
				})
				.catch((error) => {
					console.error("Error fetching scene content:", error)
				})
		}
	}, [projectState, updateEditorState])

	// This component doesn't render anything; it's just for updating the editor state
	return null
}

export default EditorUpdater
