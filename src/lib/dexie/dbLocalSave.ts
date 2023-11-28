import { db } from '@lib/dexie/db';

export const dbLocalSave = (sceneId: number, contentString: string) => {
        if(sceneId){

                db.scenes.update(sceneId, { scene_content: contentString, last_modified: new Date() })
                .then(() => console.log('Content saved to database:', contentString))
                .catch(error => console.error('Error saving content:', error));
        }
}