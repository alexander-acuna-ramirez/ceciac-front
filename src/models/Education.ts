export interface Education {
  id?: number;
  id_user: string | number;
  school: string;
  field_of_study: string;
  start_date: string;
  end_date: string | null;
  degree: string | null;
  description: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

/*
            'school' => 'required|max:255',
            'degree' => 'required|max:255',
            'field_of_study' => 'nullable|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nulleable|after_or_equal|start_date',
            'grade' => 'nulleable|max:255',
            'activities_and_societies'    => "required|array",
            'activities_and_societies.*'  => "required|string|distinct",
            'description' => 'required|max:255'
*/
