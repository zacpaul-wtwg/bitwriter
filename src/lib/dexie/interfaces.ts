// src/lib/dexie/interfaces.ts

export interface IProject {
  project_id: number;
  project_name: string;
  user_id: string;
  last_modified: Date;
}

export interface IChapter {
  chapter_id: number;
  project_id: number;
  chapter_name: string;
  chapter_order: number;
  last_modified: Date;
}

export interface IScene {
  scene_id: number;
  chapter_id: number;
  scene_name: string;
  scene_content: string;
  scene_order: number;
  scene_version: number;
  last_modified: Date;
}
