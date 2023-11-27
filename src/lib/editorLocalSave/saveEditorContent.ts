import { convertToRaw } from 'draft-js';
import { db } from '@lib/dexie/db';
import { dbLocalSave } from '../dexie/dbLocalSave';

const saveEditorContent = (editorState, sceneId) => {
    if (!editorState || !sceneId) {
        console.error('Missing editor state or scene ID for saving content.');
        return;
    }

    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const contentString = JSON.stringify(rawContent);

    dbLocalSave(sceneId, contentString);

};

export default saveEditorContent;
