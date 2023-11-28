import { db } from './db';
import mockChapters from '@mocks/chapters.json'; // Adjust path as needed
import fetchUserInfo from '../fetch/fetchUserInfo';

export async function initializeNewProject(projectTitle, chapterTitle, sceneTitle) {
    try {
        const userInfo = await fetchUserInfo();
        console.log("user id: ", userInfo.data.user.id);
        console.log("Initializing sample data...");

        const projectId = await db.projects.add({
            project_name: projectTitle,
            user_id: userInfo.data.user.id,
            last_modified: new Date(),
        });

        const chapterId = await db.chapters.add({
            project_id: projectId,
            chapter_name: chapterTitle,
            chapter_order: 1,
            last_modified: new Date(),
        });

        await db.scenes.add({
            chapter_id: chapterId,
            scene_name: sceneTitle,
            scene_content: "",
            scene_order: 1,
            last_modified: new Date(),
        });

        return projectId
    } catch (err) {
        console.error('Error initializing project:', err);
        throw new Error('Failed to initialize the project.');
    }
}
