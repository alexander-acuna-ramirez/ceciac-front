import { Project } from './Project';
import { User } from './User';

export interface ProjectParticipant {
  id?: number;
  project_id: number,
  id_user: number,
  project?: Project,
  user?: User,
  created_at?: string;
  updated_at?: string;
}
