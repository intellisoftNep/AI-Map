export interface HistoricPlace {
  id: string;
  name_en: string;
  name_ne: string;
  description_en: string;
  description_ne: string;
  latitude: number;
  longitude: number;
  category: PlaceCategory;
  photo_urls: string[];
  video_url?: string;
  audio_url?: string;
  opening_hours?: string;
  entry_fee?: string;
  rating: number;
  review_count: number;
  historical_period?: string;
  how_to_reach_en?: string;
  how_to_reach_ne?: string;
  best_time_to_visit?: string;
  nearby_place_ids: string[];
  is_featured: boolean;
  thumbnail_url?: string;
  address: string;
  city: string;
  province: string;
  province_id?: number;
  district_id?: string;
  municipality_id?: string;
  municipality_name_en?: string;
  municipality_name_ne?: string;
  created_at: string;
  updated_at: string;
}

export type PlaceCategory =
  | 'temple'
  | 'stupa'
  | 'durbar'
  | 'palace'
  | 'monument'
  | 'museum'
  | 'garden'
  | 'heritage';

export interface Project {
  id: string;
  name: string;
  description: string;
  location_name: string;
  latitude: number;
  longitude: number;
  start_date: string;
  end_date: string;
  status: ProjectStatus;
  category: ProjectCategory;
  contractor: string;
  budget_total: number;
  budget_spent: number;
  physical_progress: number; // 0-100 percentage
  financial_progress: number; // 0-100 percentage
  photos: string[];
  notes: string;
  created_at: string;
  updated_at: string;
  milestones: Milestone[];
  ping_history: PingRecord[];
  province_id?: number;
  district_id?: string;
  municipality_id?: string;
  municipality_name_en?: string;
  municipality_name_ne?: string;
}

export type ProjectStatus =
  | 'planning'
  | 'ongoing'
  | 'completed'
  | 'on_hold'
  | 'cancelled';

export type ProjectCategory =
  | 'restoration'
  | 'conservation'
  | 'infrastructure'
  | 'documentation'
  | 'tourism'
  | 'other';

export interface Milestone {
  id: string;
  title: string;
  description: string;
  due_date: string;
  completed: boolean;
  completed_date?: string;
}

export interface PingRecord {
  id: string;
  project_id: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  physical_progress: number;
  financial_progress: number;
  notes: string;
  photos: string[];
  pinged_by: string;
}

export interface ProgressUpdate {
  id: string;
  project_id: string;
  date: string;
  physical_progress: number;
  financial_progress: number;
  budget_spent: number;
  description: string;
  photos: string[];
  created_by: string;
}

export interface DashboardStats {
  total_places: number;
  total_projects: number;
  ongoing_projects: number;
  completed_projects: number;
  total_budget: number;
  total_spent: number;
  avg_physical_progress: number;
  avg_financial_progress: number;
  places_by_category: Record<string, number>;
  projects_by_status: Record<string, number>;
}
