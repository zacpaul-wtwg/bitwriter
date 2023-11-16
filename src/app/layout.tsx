// src/layouts/RootLayout.jsx
"use client"
import React from "react"
import "@styles/globals.css"
import FileBar from "@/components/fileBar/FileBar"
import { EditorProvider } from "@contexts/EditorContext" // Adjust the import path as needed
import { ProjectProvider } from "@contexts/ProjectContext"

export default function RootLayout({ children }) {
	return (
		<ProjectProvider>
			<EditorProvider>
				<html lang='en'>
					<body>
						<FileBar />
						<div className='flex-row'>
							<main className='container'>
								<div className='content'>{children}</div>
							</main>
						</div>
					</body>
				</html>
				<style jsx>
					{`
						.flex-row {
							display: flex;
							flex-direction: row;
							height: calc(var(--vw-height) - var(--file-bar-height));
						}
						.container {
							display: flex;
							justify-content: center;
							width: 100%;
						}
						.content {
							overflow-y: scroll;
							width: 900px;
						}
					`}
				</style>
			</EditorProvider>
		</ProjectProvider>
	)
}
