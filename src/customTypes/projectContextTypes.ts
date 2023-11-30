import { IProject, IChapter, IScene } from '@customTypes/databaseTypes';
import { ReactNode } from 'react';

export type ProjectState = {
  project_id: IProject['id'];
  chapter_id: IChapter['id'];
  scene_id: IScene['id'];
};

export type ScenesMap = { [key: string]: IScene[] }

export interface ProjectContextType {
  projectState: ProjectState;
  setProjectState: (projectState: ProjectState) => void;
  updateProjectState: (projectState: ProjectState) => void;
}

export interface ProjectProviderProps {
  children: ReactNode;
}
