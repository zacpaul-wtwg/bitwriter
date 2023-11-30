// File Path: src/lib/utils/setProjectStateUtility.ts
import { db } from '@dexie/db';
import { IProject} from '@customTypes/databaseTypes';
import { ProjectState } from '@customTypes/projectContextTypes';
const setProjectStateUtility = async (
    projectId: IProject['id'],
    setProjectState: (projectState: ProjectState) => void
) => {
    try {
        const firstChapter = await db.chapters.where({ project_id: projectId }).first();
        const firstScene = firstChapter ? await db.scenes.where({ chapter_id: firstChapter.id }).first() : null;

        setProjectState({
            project_id: projectId,
            chapter_id: firstChapter ? firstChapter.id : '',
            scene_id: firstScene ? firstScene.id : '',
        });
    } catch (error) {
        console.error('Error in setProjectUtility:', error);
        // Handle the error appropriately
    }
};

export default setProjectStateUtility;
