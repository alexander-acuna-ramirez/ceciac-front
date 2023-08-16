import { File } from './File';
import { Network } from './Network';
import { ProjectType } from './ProjectType';
import { Tag } from './Tag';

export interface Project {
  id?: number;
  name: string;
  description: string;
  release_date: string;
  end_date: string;
  synopsis: string;
  id_network: number | null;
  type_id: number | null;
  participants_count?: number;
  created_at?: string;
  updated_at?: string;
  network?: Network;
  file?: File;
  type?: ProjectType;
  files?: File[];
  tags?: Tag[];
}
