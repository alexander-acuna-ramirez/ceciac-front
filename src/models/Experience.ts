export interface Experience {
  id?: number;
  id_user: string | number;
  title: string;
  description: string;
  company: string;
  location: string;
  start_date: string;
  end_date: string | null;
  currently_working: number;
  duration?: string;
  skills: string[];
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
