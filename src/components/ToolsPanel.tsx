// File Path: src/components/SettingsTabs.tsx

import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faCog,
	faUser,
	faBook,
	faIdCard,
	faMountainCity,
	faStamp,
	faGem,
	faList,
	faCodeBranch,
} from "@fortawesome/free-solid-svg-icons"
import { Resizable } from "re-resizable"

const tabs = [
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

const ToolsPanel: React.FC = () => {
	const [activeTab, setActiveTab] = useState<string | null>(null)
	const [containerWidth, setContainerWidth] = useState<number>(0) // Initial width
	const [prevContainerWidth, setPrevContainerWidth] = useState<number>(0) // Previous width
	const [isExpanded, setIsExpanded] = useState<boolean>(false) // Track if container is expanded
	console.log("current container width", containerWidth)
	console.log("prev container width", prevContainerWidth)

	const toggleTab = (tabId: string) => {
		if (activeTab === tabId) {
			// If the same tab is clicked, collapse the container
			setPrevContainerWidth(containerWidth)
			setContainerWidth(0)
			setIsExpanded(false)
			setActiveTab(null)
		} else {
			if (!isExpanded) {
				setContainerWidth(prevContainerWidth)
			}
			setIsExpanded(true)
			setActiveTab(tabId)
		}
	}

	const renderContent = () => {
		switch (activeTab) {
			case "project":
				return <div></div>
			case "placeholders":
				return (
					<>
						<h1>Placeholders</h1>
					</>
				)
			default:
				return null
		}
	}

	return (
		<div className={`settings-container ${activeTab ? "expanded" : ""}`}>
			<div className='tabs'>
				<div>
					{tabs.map((tab) => (
						<React.Fragment key={tab.id}>
							<button
								title={tab.title}
								key={tab.id}
								className={activeTab === tab.id ? "active" : ""}
								onClick={() => toggleTab(tab.id)}
							>
								<FontAwesomeIcon icon={tab.icon} size='2x' color='gray' />
							</button>
							{tab.horizontal_rule && (
								<div className='rule-padding'>
									<hr />
								</div>
							)}
						</React.Fragment>
					))}
				</div>
				<div className='settings'>
					<button>
						<FontAwesomeIcon icon={faCog} size='2x' color='white' />
					</button>
					<button>
						<FontAwesomeIcon icon={faUser} size='2x' color='white' />
					</button>
				</div>
			</div>
			<Resizable
				size={{ width: containerWidth, height: "100%" }}
				minWidth={activeTab ? 100 : 0} // Set dynamic minimum width
				maxWidth={1000}
				enable={isExpanded ? { right: true } : {}}
				handleComponent={{
					right: <div className='resize-handle' />, // Custom handle on the right
				}}
				onResizeStop={(e, direction, ref, d) => {
					setContainerWidth(containerWidth + d.width)
					setPrevContainerWidth(containerWidth)
				}}
			>
				<div className='tabs-content'>
					<div className='content-styles'>{renderContent()}</div>
				</div>
			</Resizable>
			<style jsx>{`
				.settings-container {
					bottom: 0;
					left: 0;
					display: flex;
					flex-direction: row;
					height: 100%;
					transition: width 0.3s ease;
					z-index: 1000;
					height: 100%;
				}
				.settings-container.expanded {
					width: 700px;
				}
				.tabs {
					flex: 0 0 50px;
					background: var(--main-background-dark);
					color: var(--gray-light);
					overflow-y: auto;
					text-align: right;
					border-right: 1px solid var(--gray-dark);
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding: 0px 3px;
				}
				.tabs button {
					display: inline-block;
					width: 100%;
					padding: 15px 0px;
					border: none;
					background: none;
					color: inherit;
					cursor: pointer;
				}
				.tabs button.active {
					background: var(--gray-medium);
					color: var(--gray-dark);
				}
				.tabs-content {
					flex: 1;
					height: 100%;
					width: 100%;
					overflow-y: auto;
					background: var(--main-background-dark);
					border-right: 1px solid var(--gray-medium);
				}
				.content-styles {
					padding: 20px;
				}
				.resize-handle {
					position: absolute;
					top: 50%;
					right: -1px;
					width: 10px;
					height: 40px;
					background-color: #ccc;
					cursor: col-resize;
					-webkit-transform: translatey(-50%);
					-moz-transform: translatey(-50%);
					-ms-transform: translatey(-50%);
					-o-transform: translatey(-50%);
					transform: translatey(-50%);
					-webkit-border-radius: 5px;
					-moz-border-radius: 5px;
					border-radius: 5px;
					display: block;
					z-index: -1;
				}
				.rule-padding {
					padding: 0px 10px;
					& hr {
						color: grey;
					}
				}
			`}</style>
		</div>
	)
}

export default ToolsPanel
