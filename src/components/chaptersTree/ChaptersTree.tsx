// src/components/chaptersTree/ChaptersTree.tsx

import React, { useEffect, useState } from "react"
import { useProject } from "@contexts/ProjectContext"
import { fetchChaptersFromDb } from "./fetchChapters"
import { fetchScenesFromDb } from "./fetchScenes"
import { IChapter, IScene } from "@lib/dexie/interfaces"

export const ChaptersTree = () => {
	const [chapters, setChapters] = useState<IChapter[]>([])
	const [scenes, setScenes] = useState<{ [key: number]: IScene[] }>({})
	const { currentProject } = useProject()

	useEffect(() => {
		if (currentProject && currentProject.id) {
			fetchChaptersFromDb(currentProject.id)
				.then((fetchedChapters) => {
					setChapters(fetchedChapters)
					return Promise.all(
						fetchedChapters.map((chapter) =>
							fetchScenesFromDb(chapter.chapter_id)
						)
					)
				})
				.then((fetchedScenes) => {
					const scenesMap = fetchedScenes.reduce(
						(acc, scenesForChapter, index) => {
							acc[chapters[index].chapter_id] = scenesForChapter
							return acc
						},
						{}
					)
					setScenes(scenesMap)
				})
				.catch((error) =>
					console.error("Error fetching chapters or scenes:", error)
				)
		}
	}, [currentProject, chapters, scenes])

	return (
		<div>
			{chapters.length ? (
				chapters.map((chapter) => (
					<div key={chapter.chapter_id}>
						<h3>{chapter.chapter_name}</h3>
						<ul>
							{scenes[chapter.chapter_id] &&
								scenes[chapter.chapter_id].map((scene) => (
									<li key={scene.scene_id}>{scene.scene_name}</li>
								))}
						</ul>
					</div>
				))
			) : (
				<p>No chapters available for this project.</p>
			)}
		</div>
	)
}
