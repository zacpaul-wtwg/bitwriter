import { db } from './db';
import mockChapters from '@mocks/chapters.json'; // Adjust path as needed
import fetchUserInfo from '../fetch/fetchUserInfo';

export async function initializeSampleData() {
    const userInfo = await fetchUserInfo();
    console.log("user id: ", userInfo.data.user.id);
    console.log("Initializing sample data...");

    const existingProject = await db.projects
      .where("project_name")
      .equals("Example Project")
      .first();

    if (existingProject) {
      console.log("Sample project already exists, skipping initialization.");
      return;
    }

    console.log("Sample project does not exist, creating it...");

const projectId = await db.projects.add({
  project_name: "Example Project",
  user_id: userInfo.data.user.id,
  last_modified: new Date(),
}) as number;

// Assuming mockChapters is an array of objects conforming to IChapter without the chapter_id
for (const chapter of mockChapters) {
  const chapterId = await db.chapters.add({
    project_id: projectId, // This is the ID returned from the projects table
    chapter_name: chapter.title,
    chapter_order: chapter.chapter_order,
    last_modified: new Date(),
  }) as number;

  // Assuming each chapter has an array of scenes
  for (const scene of chapter.scenes) {
    await db.scenes.add({
      chapter_id: chapterId, // This is the ID returned from the chapters table
      scene_name: scene.title,
      scene_content: JSON.stringify(scene.content),
      scene_order: scene.scene_order,
      last_modified: new Date(),
    });
  }
}


    console.log(`Sample project with chapters and scenes created for project_id: ${projectId}`);
}
