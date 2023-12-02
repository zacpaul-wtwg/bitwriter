// src/components/chaptersTree/ChapterBlock.tsx
import React from "react"
import { IScene } from "@customTypes/databaseTypes"

interface ChapterBlockProps {
	chapterId: string
	chapterName: string
	scenes: IScene[]
	handleSceneClick: (scene: IScene) => void
	currentSceneId: string | null
}

export const ChapterBlock: React.FC<ChapterBlockProps> = ({
	chapterId,
	chapterName,
	scenes,
	handleSceneClick,
	currentSceneId,
}) => {
	return (
		<>
			<div className='title-bar'>
				<span className='chapter-heading'>{chapterName}</span>
			</div>
			<div key={chapterId} className='chapter-block'>
				<ul>
					{scenes.map((scene) => (
						<li
							key={scene.id}
							onClick={() => handleSceneClick(scene)}
							className={currentSceneId === scene.id ? "current-scene" : ""}
						>
							{scene.name}
						</li>
					))}
				</ul>
			</div>
			<style jsx>{`
				.title-bar {
					color: var(--gray-light);
					font-weight: 900;
					font-size: 1em;
					border: 1px solid var(--gray-medium);
					border-bottom: none;
					border-radius: 10px 10px 0px 0px;
					padding-left: 20px;
				}
				.chapter-block {
					background-color: var(--main-background-dark);
					border: 1px solid var(--gray-medium);
					padding: 10px 10px 10px 10px;
					border-radius: 0px 0px 10px 10px;
					margin-bottom: 10px;
					overflow-x: hidden;
					overflow-y: visible;
				}
				ul {
					list-style: none;
					padding: 0;
					margin: 0;
				}
				li {
					padding: 0px 12px;
					border-radius: 4px;
					cursor: pointer;
					white-space: nowrap;
				}
				li:hover {
					color: white;
					background-color: var(--gray-medium);
				}
				.current-scene,
				li:hover.current-scene {
					color: var(--main-background-dark);
					background-color: var(--gray-light);
					font-weight: 700;
				}
			`}</style>
		</>
	)
}

export default ChapterBlock
