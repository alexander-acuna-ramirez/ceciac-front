import { Network } from './Network';
import { User } from './User';

export interface NetworkRepresentative {
  id?: number;
  id_user: number;
  id_network: number;
  rank: number;
  network?: Network;
  user?: User;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
