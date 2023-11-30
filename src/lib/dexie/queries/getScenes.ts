// src/components/chaptersTree/fetchScenesFromDb.ts

import { db } from '@lib/dexie/db';
import { IChapter } from '@customTypes/databaseTypes'; // Adjust the import path as needed


export const getScenesFromDb = async (chapter_id: IChapter['id']) => {
  try {
    return await db.scenes.where({ chapter_id: chapter_id }).toArray();
  } catch (error) {
    console.error("Error fetching scenes from DB:", error);
    throw error;
  }
};
