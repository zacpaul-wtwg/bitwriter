// src/lib/dexie/dbInit.ts

import Dexie, { Table } from 'dexie';
import mockChapters from '@mocks/chapters.json'; // Make sure the path is correct
import fetchUserInfo from '../fetch/fetchUserInfo';

// Define interfaces for each table
export interface IProject {
  project_id?: number; // project_id should be a number
  project_name: string;
  user_id: string;
  last_modified: Date;
}

export interface IChapter {
  chapter_id?: number;
  project_id: number;
  chapter_name: string;
  chapter_order: number;
  last_modified: Date;
}

export interface IScene {
  scene_id?: number;
  chapter_id: number;
  scene_content: string;
  scene_order: number;
  last_modified: Date;
}

// Extend Dexie to define the database schema
class NovelDatabase extends Dexie {
  projects!: Table<IProject>;
  chapters!: Table<IChapter>;
  scenes!: Table<IScene>;

  constructor() {
    super('ProjectDB');
    this.version(1).stores({
      // Dexie auto-increments project_id
      projects: '++project_id, project_name, user_id, last_modified', 
      // Dexie auto-increments chapter_id
      chapters: '++chapter_id, project_id, chapter_name, chapter_order, last_modified', 
      // Dexie auto-increments scene_id
      scenes: '++scene_id, chapter_id, scene_content, scene_order, last_modified', 
    });
  }

  async initializeSampleData() {
    const userInfo = await fetchUserInfo();
    console.log("user id: ", userInfo.data.user.id)
    console.log("Initializing sample data...");

    const existingProject = await this.projects
      .where("project_name")
      .equals("Example Project")
      .first();

    if (existingProject) {
      console.log("Sample project already exists, skipping initialization.");
      return;
    }

    console.log("Sample project does not exist, creating it...");

    const projectId = await this.projects.add({
      project_name: "Example Project",
      user_id: userInfo.data.user.id, // Assuming this is the correct field
      last_modified: new Date(),
    });

    // Iterate over the new mock data structure to add chapters and scenes
    for (const chapter of mockChapters) {
      const chapterId = await this.chapters.add({
        //@ts-ignore
        project_id: projectId,
        chapter_name: chapter.title,
        chapter_order: chapter.chapter_order,
        last_modified: new Date(),
      });

      for (const scene of chapter.scenes) {
        await this.scenes.add({
          //@ts-ignore
          chapter_id: chapterId,
          scene_content: scene.content,
          scene_order: scene.scene_order,
          last_modified: new Date(),
        });
      }
    }

    console.log(`Sample project with chapters and scenes created for project_id: ${projectId}`);
  }
}

export const dbInit = new NovelDatabase();


