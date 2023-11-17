// src/components/chaptersTree/fetchScenesFromDb.ts

import { db } from '@lib/dexie/db';

export const fetchScenesFromDb = async (chapterId: number) => {
  try {
    return await db.scenes.where({ chapter_id: chapterId }).toArray();
  } catch (error) {
    console.error("Error fetching scenes from DB:", error);
    throw error;
  }
};
