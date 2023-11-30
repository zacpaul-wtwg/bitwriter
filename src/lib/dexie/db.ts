import Dexie, { Table } from 'dexie';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator
import { IProject, IChapter, IScene } from '@customTypes/databaseTypes';

class ProjectDatabase extends Dexie {
  projects!: Table<IProject>;
  chapters!: Table<IChapter>;
  scenes!: Table<IScene>;

  constructor() {
    super('ProjectDB');
    this.version(1).stores({
      projects: 'id, project_name, user_id, last_modified',
      chapters: 'id, project_id, user_id, chapter_name, chapter_order, last_modified',
      scenes: 'id, chapter_id, project_id, user_id, scene_name, scene_content, scene_order, scene_version, last_modified',
    });

    // Hooks to generate UUIDs for new entries
    this.projects.hook('creating', () => uuidv4());
    this.chapters.hook('creating', () => uuidv4());
    this.scenes.hook('creating', () => uuidv4());
  }
}

export const db = new ProjectDatabase();
