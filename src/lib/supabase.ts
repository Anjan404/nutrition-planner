import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          age: number | null;
          height: number | null;
          weight: number | null;
          activity_level: string | null;
          dietary_restrictions: string[] | null;
          medical_conditions: string[] | null;
          fitness_goals: string[] | null;
          cultural_preferences: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          age?: number | null;
          height?: number | null;
          weight?: number | null;
          activity_level?: string | null;
          dietary_restrictions?: string[] | null;
          medical_conditions?: string[] | null;
          fitness_goals?: string[] | null;
          cultural_preferences?: string[] | null;
        };
        Update: {
          full_name?: string | null;
          age?: number | null;
          height?: number | null;
          weight?: number | null;
          activity_level?: string | null;
          dietary_restrictions?: string[] | null;
          medical_conditions?: string[] | null;
          fitness_goals?: string[] | null;
          cultural_preferences?: string[] | null;
          updated_at?: string;
        };
      };
      meal_plans: {
        Row: {
          id: string;
          user_id: string;
          plan_name: string;
          meals: any;
          calories_target: number;
          created_at: string;
        };
        Insert: {
          user_id: string;
          plan_name: string;
          meals: any;
          calories_target: number;
        };
        Update: {
          plan_name?: string;
          meals?: any;
          calories_target?: number;
        };
      };
      food_logs: {
        Row: {
          id: string;
          user_id: string;
          food_name: string;
          calories: number;
          proteins: number;
          carbs: number;
          fats: number;
          image_url: string | null;
          logged_at: string;
        };
        Insert: {
          user_id: string;
          food_name: string;
          calories: number;
          proteins: number;
          carbs: number;
          fats: number;
          image_url?: string | null;
        };
        Update: {
          food_name?: string;
          calories?: number;
          proteins?: number;
          carbs?: number;
          fats?: number;
          image_url?: string | null;
        };
      };
    };
  };
};