import { convertToRaw } from 'draft-js';
import { db } from '@lib/dexie/db';

const saveEditorContent = (editorState, sceneId) => {
    if (!editorState || !sceneId) {
        console.error('Missing editor state or scene ID for saving content.');
        return;
    }

    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const contentString = JSON.stringify(rawContent);

    db.scenes.update(sceneId, { scene_content: contentString })
        .then(() => console.log('Content saved to database:', contentString))
        .catch(error => console.error('Error saving content:', error));
};

export default saveEditorContent;
