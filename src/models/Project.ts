import { Network } from './Network';
import { ProjectType } from './ProjectType';

export interface Project {
  id?: number;
  name: string;
  description: string;
  release_date: string;
  end_date: string;
  synopsis: string;
  network_id: number | null;
  type_id: number | null;
  created_at?: string;
  updated_at?: string;
  network?: Network;
  type?: ProjectType;
}
