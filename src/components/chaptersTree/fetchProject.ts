// src/components/chaptersTree/fetchChapters.ts

import { db } from '@dexie/db';

export const fetchProjectFromDb = async (projectId: number) => {
  try {
    const response = await db.projects.where({ project_id: projectId }).first();
    return response;
  } catch (error) {
    console.error("Error fetching chapters from DB:", error);
    throw error;
  }
};
