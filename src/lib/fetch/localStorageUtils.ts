// /src/lib/localStorageUtils.ts
import { useProject } from "@contexts/ProjectContext"

// Function to get data from local storage
export const getLocalStorage = (key: string) => {
    // Check if running in a browser environment
    if (typeof window === 'undefined') {
        return null;
    }

    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
};

// Function to set data in local storage
export const setLocalStorage = (key: string, value: any) => {
    // Check if running in a browser environment
    if (typeof window === 'undefined') {
        return;
    }

    localStorage.setItem(key, JSON.stringify(value));
};

export const setProjectState = (project_id: number = 0, scene_id: number = 0) => {
    const projectState:object = {
        project_id: project_id,
        scene_id: scene_id,
    }
    const projectStateJSON:string = JSON.stringify(projectState);
    localStorage.setItem('projectState', projectStateJSON);
}
