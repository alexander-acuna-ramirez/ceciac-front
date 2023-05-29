import { Country } from './Country';
import { Experience } from './Experience';
import { File } from './File';
import { Profession } from './Profession';
import { UserProfileType } from './UserProfileType';

export interface User {
  id?: number;
  name: string;
  lastname: string;
  orcid_code?: string | null;
  linkedin?: string | null;
  email: string;
  professional_summary: string | null;
  summary: string | null;
  password?: string;
  id_logo: number | null;
  id_banner: number | null;
  id_profession: number | null;
  id_country: number | string;
  experiences?: Experience[];
  logo?: File;
  banner?: File;
  country?: Country;
  profession?: Profession;
  profile_types?: UserProfileType[];
  email_verified_at?: string | null;
  created_at?: string;
  updated_at?: string;
}
