export interface IProject {
  project_id: string;
  project_name: string;
  user_id: string; 
  last_modified: Date;
}

export interface IChapter {
  chapter_id: string; 
  project_id: string; 
  user_id: string; 
  chapter_name: string;
  chapter_order: number;
  last_modified: Date;
}

export interface IScene {
  scene_id: string; 
  chapter_id: string; 
  project_id: string; 
  user_id: string; 
  scene_name: string;
  scene_content: string;
  scene_order: number;
  scene_version: number;
  last_modified: Date;
}
