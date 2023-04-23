export interface File {
  id?: number;
  filename: string;
  mime: string;
  path: string;
  fullpath: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
