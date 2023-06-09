import { Country } from './Country';
import { File } from './File';

export interface Network {
  id?: number;
  name: string;
  email: string;
  contact_name: string;
  contact_email: string;
  country_id: number;
  description: string;
  social_network: string;
  web: string;
  country?: Country;
  logo?: File;
  banner?: File;
  description_2: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
