export interface IProject {
	id: string
	name: string
	last_modified: Date
	user_id: string
}

export interface IChapter {
	id: string
	name: string
	order: number
	last_modified: Date
	project_id: string
	user_id: string
}

export interface IScene {
	id: string
	name: string
	content: string
	version: number
	order: number
	last_modified: Date
	user_id: string
	project_id: string
	chapter_id: string
}
