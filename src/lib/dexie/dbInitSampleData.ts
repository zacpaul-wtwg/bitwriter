// src/lib/dexie/dbInitSampleData.ts

import { db } from './db';
import mockChapters from '@mocks/chapters.json'; // Adjust path as needed
import fetchUserInfo from '../fetch/fetchUserInfo';

export async function initializeSampleData() {
    const userInfo = await fetchUserInfo();
    console.log("user id: ", userInfo.data.user.id);
    console.log("Initializing sample data...");

    const existingProject = await db.projects
      .where("name")
      .equals("Example Project")
      .first();

    if (existingProject) {
      console.log("Sample project already exists, skipping initialization.");
      return;
    }

    console.log("Sample project does not exist, creating it...");
    //@ts-ignore
    const projectId = await db.projects.add({
      name: "Example Project",
      user_id: userInfo.data.user.id,
      last_modified: new Date(),
    });

    for (const chapter of mockChapters) {
      const chapterId = await db.chapters.add({
        //@ts-ignore
        project_id: projectId,
        user_id: userInfo.data.user.id, // Add user_id for chapters
        name: chapter.title,
        order: chapter.chapter_order,
        last_modified: new Date(),
      });

      for (const scene of chapter.scenes) {
        await db.scenes.add({
          //@ts-ignore
          chapter_id: chapterId,
          //@ts-ignore
          project_id: projectId, // Add project_id for scenes
          user_id: userInfo.data.user.id, // Add user_id for scenes
          name: scene.title,
          content: JSON.stringify(scene.content),
          order: scene.scene_order,
          last_modified: new Date(),
          version: 1, // Assuming version starts at 1
        });
      }
    }

    console.log(`Sample project with chapters and scenes created for project_id: ${projectId}`);
}
