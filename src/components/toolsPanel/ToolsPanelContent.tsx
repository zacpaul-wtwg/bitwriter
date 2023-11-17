import { ChaptersTree } from "../chaptersTree/ChaptersTree"

export const renderContent = (activeTab: string) => {
	switch (activeTab) {
		case "project":
			return (
				<>
					<ChaptersTree />
				</>
			)
		case "placeholders":
			return (
				<>
					<h2>Placeholders</h2>
				</>
			)
		default:
			return null
	}
}
