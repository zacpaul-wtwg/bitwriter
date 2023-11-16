// File Path: src/components/FileBar.tsx
"use client"

import React, { useState, useEffect, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFile, faPenNib } from "@fortawesome/free-solid-svg-icons"
import { dbInitAction } from "@dexie/dbInitAction"

const FileBar: React.FC = () => {
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
	const dropdownRefs = useRef(new Map<string, HTMLDivElement>())
	const fileBarActions = [
		{
			id: "project",
			label: "Project",
			icon: faFile,
			dropdown: [
				{
					name: "Open Project",
					action: () => console.log("Opening project..."),
				},
				{
					name: "Create New Project",
					action: () => console.log("Creating new project..."),
				},
				{
					name: "Create Example Project",
					action: () => dbInitAction(),
				},
			],
		},
		// Add more sections with dropdowns as needed
	]

	const toggleDropdown = (actionId: string) => {
		setActiveDropdown(activeDropdown === actionId ? null : actionId)
	}

	const handleDropdownAction = (dropdownAction: {
		name: string
		action: () => void
	}) => {
		console.log(`Dropdown action ${dropdownAction.name} selected`)
		dropdownAction.action() // Call the action function
		setActiveDropdown(null) // Close the dropdown after an action is selected
	}

	// Close the dropdown if the click is outside of the dropdown
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			let isOutside = true
			dropdownRefs.current.forEach((ref) => {
				if (ref.contains(event.target as Node)) {
					isOutside = false
				}
			})
			if (isOutside) {
				setActiveDropdown(null)
			}
		}

		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [])

	return (
		<div className='top-file-bar'>
			<div className='logo'>
				<FontAwesomeIcon icon={faPenNib} />
			</div>
			{fileBarActions.map((action) => (
				<div
					className='dropdown'
					key={action.id}
					ref={(el) => {
						if (el) {
							dropdownRefs.current.set(action.id, el)
						} else {
							dropdownRefs.current.delete(action.id)
						}
					}}
				>
					<button
						onClick={() => toggleDropdown(action.id)}
						title={action.label}
					>
						{action.label}
					</button>
					{activeDropdown === action.id && (
						<div className='dropdown-content'>
							{action.dropdown.map((item) => (
								<button
									key={item.name}
									onClick={() => handleDropdownAction(item)}
								>
									{item.name}
								</button>
							))}
						</div>
					)}
				</div>
			))}
			<style jsx>{`
				.top-file-bar {
					display: flex;
					align-items: center;
					background: var(--main-background-dark);
					padding: 5px 10px;
					z-index: 1001;
					border-bottom: 3px solid var(--gray-medium);
					color: white;
					height: var(--file-bar-height);
				}
				.dropdown {
					position: relative;
					margin-right: 10px;
				}
				.dropdown button {
					padding: 5px;
					border: none;
					background: none;
					color: var(--gray-light);
					cursor: pointer;
				}
				.dropdown-content {
					position: absolute;
					background: var(--main-background-dark);
					display: flex;
					flex-direction: column;
					padding: 5px;
					border: 1px solid var(--gray-medium);
					box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
					z-index: 1002;
					width: fit-content;
				}
				.dropdown-content button {
					padding: 5px;
					border: none;
					background: none;
					color: var(--gray-light);
					text-align: left;
					cursor: pointer;
					white-space: nowrap;
				}
				.dropdown-content button:hover {
					background: var(--gray-medium);
				}
				.logo {
					padding: 3px 10px;
				}
			`}</style>
		</div>
	)
}

export default FileBar
