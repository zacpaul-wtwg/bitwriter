// src/lib/dexie/db.ts
import Dexie, { Table } from 'dexie';
import { IProject, IChapter, IScene } from './interfaces';

class ProjectDatabase extends Dexie {
  projects!: Table<IProject>;
  chapters!: Table<IChapter>;
  scenes!: Table<IScene>;

  constructor() {
    super('ProjectDB');
    this.version(1).stores({
      projects: '++project_id, project_name, user_id, last_modified',
      chapters: '++chapter_id, project_id, chapter_name, chapter_order, last_modified',
      scenes: '++scene_id, chapter_id, scene_name, scene_content, scene_order, scene_version, last_modified',
    });
  }
}

export const db = new ProjectDatabase();