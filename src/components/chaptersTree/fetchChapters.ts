// src/components/chaptersTree/fetchChapters.ts

import { db } from '@dexie/db';

export const fetchChaptersFromDb = async (projectId: number) => {
  try {
    const response = await db.chapters.where({ project_id: projectId }).toArray();
    return response;
  } catch (error) {
    console.error("Error fetching chapters from DB:", error);
    throw error;
  }
};
