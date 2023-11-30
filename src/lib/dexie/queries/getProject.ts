// src/components/chaptersTree/fetchChapters.ts

import { db } from '@dexie/db';
import { IProject } from '@customTypes/databaseTypes'; // Adjust the import path as needed

export const getProjectFromDb = async (project_id: IProject['id']) => {
  try {
    const response = await db.projects.where({ id: project_id }).first();
    return response;
  } catch (error) {
    console.error("Error fetching project from DB:", error);
    throw error;
  }
};
