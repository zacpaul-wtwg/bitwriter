import { ReactNode } from 'react';
import { IProject, IChapter, IScene } from '@customTypes/databaseTypes';

export type ProjectState = Pick<IProject, 'project_id'> 
  & Pick<IChapter, 'chapter_id'> 
  & Pick<IScene, 'scene_id'>;

export interface ProjectContextType {
  projectState: ProjectState;
  setProjectState: (projectState: ProjectState) => void;
  updateProjectState: (projectState: ProjectState) => void;
}

export interface ProjectProviderProps {
  children: ReactNode;
}
