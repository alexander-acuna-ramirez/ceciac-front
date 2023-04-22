export interface User {
  id: number;
  name: string;
  lastname: string;
  orcid_code: string;
  email: string;
  email_verified_at: string | null;
  created_at?: string;
  updated_at?: string;
}
