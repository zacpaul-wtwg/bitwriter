// src/lib/dexie/dbLocalSave.ts

import { db } from '@lib/dexie/db';

export const dbLocalSave = (sceneId: number, contentString: string) => {
        if(sceneId){
                // Changed scene_content to content
                db.scenes.update(sceneId, { content: contentString, last_modified: new Date() })
                .then(() => console.log('Content saved to database:', contentString))
                .catch(error => console.error('Error saving content:', error));
        }
}
