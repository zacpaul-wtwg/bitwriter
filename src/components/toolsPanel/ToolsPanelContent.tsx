import ChaptersTree from "@components/chaptersTree/ChaptersTree"
import {
	faBook,
	faIdCard,
	faMountainCity,
	faStamp,
	faGem,
	faList,
	faCodeBranch,
} from "@fortawesome/free-solid-svg-icons"

export const tabs = [
	{
		id: "project",
		label: "project",
		icon: faBook,
		horizontal_rule: true,
		title: "Project Directory",
	},
	{
		id: "placeholders",
		label: "placeholders",
		icon: faStamp,
		horizontal_rule: false,
		title: "Placeholders",
	},
	{
		id: "characters",
		label: "characters",
		icon: faIdCard,
		horizontal_rule: false,
		title: "Character Blueprints",
	},
	{
		id: "places",
		label: "places",
		icon: faMountainCity,
		horizontal_rule: false,
		title: "Places Blueprints",
	},
	{
		id: "things",
		label: "things",
		icon: faGem,
		horizontal_rule: true,
		title: "Things Blueprints",
	},
	{
		id: "todo",
		label: "todo",
		icon: faList,
		horizontal_rule: false,
		title: "Todo List",
	},
	{
		id: "versioning",
		label: "versioning",
		icon: faCodeBranch,
		horizontal_rule: false,
		title: "Versions",
	},
]

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
