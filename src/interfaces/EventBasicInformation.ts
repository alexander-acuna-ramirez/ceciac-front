export interface EventBasicInformation {
  title: string;
  is_public: number;
  description: string;
  date_time: string;
  end_date_time: string;
  is_online: number;
  location?: string; // El campo location es opcional
}
