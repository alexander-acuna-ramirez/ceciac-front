import { Country } from './Country';

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
  description_2: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
