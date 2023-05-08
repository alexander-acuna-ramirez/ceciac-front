import { Country } from './Country';
import { File } from './File';
import { Profession } from './Profession';

export interface User {
  id?: number;
  name: string;
  lastname: string;
  orcid_code?: string;
  email: string;
  professional_summary: string | null;
  summary: string | null;
  password?: string;
  id_logo: number | null;
  id_banner: number | null;
  id_profession: number | null;
  id_country: number | string;

  logo?: File;
  banner?: File;
  country?: Country;
  profession?: Profession;
  email_verified_at: string | null;
  created_at?: string;
  updated_at?: string;
}
