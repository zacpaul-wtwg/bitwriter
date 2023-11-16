// src/app/page.tsx
"use client"
import React from "react"
import dynamic from "next/dynamic"

const DraftEditor = dynamic(
	() => import("@components/DraftEditor").then((mod) => mod.default),
	{ ssr: false }
)
const AppPage: React.FC = () => {
	return (
		<>
			<DraftEditor />
		</>
	)
}

export default AppPage
