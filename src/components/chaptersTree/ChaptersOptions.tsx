import React, { useState } from "react"

interface ChaptersOptionsProps {
	chapterId: string
	handleEditChapter: () => void
	handleAddChapter: (
		chapterId: string,
		position: "before" | "after",
		projectState: any
	) => void
	projectState: any // Replace 'any' with the actual type of your projectState
}

const ChaptersOptions: React.FC<ChaptersOptionsProps> = ({
	chapterId,
	handleEditChapter,
	handleAddChapter,
	projectState,
}) => {
	const [isMenuVisible, setIsMenuVisible] = useState(false)

	const toggleMenu = () => {
		setIsMenuVisible(!isMenuVisible)
	}

	return (
		<>
			<span className='options-dots' onClick={toggleMenu}>
				{isMenuVisible && (
					<div className='chapter-menu'>
						<button className='menu-item' onClick={handleEditChapter}>
							Edit Chapter
						</button>
						<button
							onClick={() =>
								handleAddChapter(chapterId, "before", projectState)
							}
						>
							Add Chapter Before
						</button>
						<button
							onClick={() => handleAddChapter(chapterId, "after", projectState)}
						>
							Add Chapter After
						</button>
					</div>
				)}
				{/* below is the element that the user will click on to access the menu */}
				...
			</span>
			<style jsx>{`
				.chapter-menu {
					z-index: 1000; /* High z-index */
					font-size: 14px; /* Adjust as needed */
					left: 0; /* Adjust as needed */
					top: 27.5px; /* Adjust as needed */
					position: absolute;
					background: var(--main-background-dark);
					display: flex;
					flex-direction: column;
					padding: 5px;
					border: 1px solid var(--gray-medium);
					box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
					z-index: 1002;
					line-height: 34px;
				}

				.chapter-menu button {
					background-color: var(--main-background-dark);
					padding: 5px 10px;
					cursor: pointer;
					color: var(--gray-light);
					white-space: nowrap;
					border: none;
				}
				.chapter-menu button:hover {
					background-color: var(--gray-medium);
					color: white;
				}
				.options-dots {
					position: relative;
					cursor: pointer;
					width: fit-content;
				}
			`}</style>
		</>
	)
}

export default ChaptersOptions
