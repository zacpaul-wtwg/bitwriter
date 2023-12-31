import React from "react"
import { IScene } from "@customTypes/databaseTypes"
import { updateName, Type } from "@lib/dexie/queries/updateName"

interface ChapterBlockProps {
	chapterId: string
	chapterName: string
	scenes: IScene[]
	handleSceneClick: (scene: IScene) => void
	currentSceneId: string | null
	editableChapterId: string | null
	editableText: string
	setEditableText: (text: string) => void
	handleBlur: () => void
}

export const ChapterBlock: React.FC<ChapterBlockProps> = ({
	chapterId,
	chapterName,
	scenes,
	handleSceneClick,
	currentSceneId,
	editableChapterId,
	editableText,
	setEditableText,
	handleBlur,
}) => {
	const handleKeyPress = async (e) => {
		if (e.key === "Enter") {
			e.preventDefault()
			e.target.blur()
		}
	}

	const handleFocus = (event) => {
		event.target.select()
	}

	return (
		<>
			<div className='title-bar'>
				{editableChapterId === chapterId ? (
					<input
						type='text'
						value={editableText}
						onChange={(e) => setEditableText(e.target.value)}
						onBlur={handleBlur}
						onKeyPress={handleKeyPress}
						onFocus={handleFocus}
						autoFocus
					/>
				) : (
					<>
						<span className='chapter-heading'>{chapterName}</span>
					</>
				)}
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
					background-color: var(--main-75);
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
					color: var(--main-75);
					background-color: var(--gray-light);
					font-weight: 700;
				}
			`}</style>
		</>
	)
}

export default ChapterBlock
