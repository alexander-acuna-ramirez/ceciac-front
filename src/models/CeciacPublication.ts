import { File } from './File';
import { Network } from './Network';

export interface CeciacPublication {
  id: number | null;
  type: string;
  title: string;
  description: string;
  extra_file: string;
  date: string;
  image: string | null;
  id_network: string | null;
  id_file: string | null;

  network?: Network;
  file?: File;
  image_file?: File;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
