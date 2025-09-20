import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dsnwecaungoitviiagoa.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if we have valid credentials
if (!supabaseAnonKey || supabaseAnonKey === 'your_supabase_anon_key_here') {
  console.warn('⚠️ Supabase anonymous key not configured properly');
  console.warn('Please update VITE_SUPABASE_ANON_KEY in your .env file');
  console.warn('You can find this key in your Supabase Dashboard → Settings → API');
}

// Create client with error handling
let supabase;
try {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('✅ Supabase client initialized');
} catch (error) {
  console.error('❌ Failed to initialize Supabase client:', error);
  // Create a mock client that won't crash the app
  supabase = {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signOut: () => Promise.resolve({ error: null })
    },
    from: () => ({
      select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) }) }),
      insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) }) }),
      upsert: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
    })
  };
}


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
