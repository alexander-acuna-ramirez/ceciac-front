import { File } from './File';
import { Network } from './Network';
import { User } from './User';

export interface Event {
  id?: number;
  title: string;
  description: string;
  event_content: string;
  id_network: string | number | null;
  id_user: string | number | null;
  id_file: string | number | null;
  location: string;
  date_time: string;
  end_date_time: string;
  is_public: number;
  is_online: number;
  network?: Network;
  user?: User;
  file?: File;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
