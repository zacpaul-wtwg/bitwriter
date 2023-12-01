// src/components/chaptersTree/fetchChapters.ts

import { db } from '@dexie/db';
import { IProject } from '@customTypes/databaseTypes'; // Adjust the import path as needed


          export const getChaptersFromDb = async (project_id: IProject['id']) => {
  try {
    const response = await db.chapters.where({ project_id: project_id }).toArray();
    return response;
  } catch (error) {
    console.error("Error fetching chapters from DB:", error);
    throw error;
  }
};
