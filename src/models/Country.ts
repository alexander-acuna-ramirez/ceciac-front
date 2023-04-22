export interface Country {
  id?: number;
  name: string;
  iso: string;
  nicename: string;
  numcode: string | null;
  phonecode: number | null;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
