import { useEffect, useRef, useCallback } from 'react';
import { useEditor } from '@contexts/EditorContext';
import { convertToRaw } from 'draft-js';
import { db } from '@lib/dexie/db';

// Debounce function
const debounce = (func, delay) => {
    let timeout;

    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => { func(...args); }, delay);
    };
};

const useAutoSaveEditorContent = (sceneId, delay = 1000) => {
    const { editorState } = useEditor();
    const currentContent = useRef();
    const currentSceneId = useRef(sceneId); // useRef to store the current scene ID

    useEffect(() => {
        currentContent.current = convertToRaw(editorState.getCurrentContent());
        currentSceneId.current = sceneId; // Update current scene ID on change
    }, [editorState, sceneId]);

    // Function to save content to IndexedDB
    const saveContent = useCallback(() => {
        const contentString = JSON.stringify(currentContent.current);
        const savingSceneId = currentSceneId.current; // Capture the scene ID at the time of save

        db.scenes.update(savingSceneId, { scene_content: contentString })
            .then(() => console.log('Content saved to database:', contentString))
            .catch(error => console.error('Error saving content:', error));
    }, []);

    // useRef to persist the debounced function across renders
    const debouncedSave = useRef(debounce(saveContent, delay));

    // Trigger the debounced save function when sceneId changes or on editorState update
    useEffect(() => {
        debouncedSave.current();
    }, [editorState]); // Triggered only on editorState update
};

export default useAutoSaveEditorContent;
