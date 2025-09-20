import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if we have valid credentials
const hasValidCredentials = supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'your_supabase_url_here' && 
  supabaseAnonKey !== 'your_supabase_anon_key_here' &&
  supabaseUrl.startsWith('https://') &&
  supabaseAnonKey.length > 50;

if (!hasValidCredentials) {
  console.warn('⚠️ Supabase credentials not properly configured');
  console.warn('URL:', supabaseUrl || 'missing');
  console.warn('Key:', supabaseAnonKey ? 'present but invalid' : 'missing');
  console.warn('Please update your .env file with valid Supabase credentials');
}

// Create a mock client for when credentials are invalid
const createMockClient = () => ({
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: (callback: any) => {
      // Call callback immediately with no session
      setTimeout(() => callback('SIGNED_OUT', null), 0);
      return { data: { subscription: { unsubscribe: () => {} } } };
    },
    signUp: () => Promise.resolve({ 
      data: null, 
      error: { message: 'Supabase not configured. Please add valid credentials to .env file.' } 
    }),
    signInWithPassword: () => Promise.resolve({ 
      data: null, 
      error: { message: 'Supabase not configured. Please add valid credentials to .env file.' } 
    }),
    signOut: () => Promise.resolve({ error: null })
  },
  from: () => ({
    select: () => ({ 
      eq: () => ({ 
        single: () => Promise.resolve({ 
          data: null, 
          error: { message: 'Supabase not configured. Please add valid credentials to .env file.' } 
        }),
        order: () => ({ 
          limit: () => ({ 
            single: () => Promise.resolve({ 
              data: null, 
              error: { message: 'Supabase not configured. Please add valid credentials to .env file.' } 
            }) 
          }) 
        })
      }) 
    }),
    insert: () => ({ 
      select: () => ({ 
        single: () => Promise.resolve({ 
          data: null, 
          error: { message: 'Supabase not configured. Please add valid credentials to .env file.' } 
        }) 
      }) 
    }),
    upsert: () => Promise.resolve({ 
      data: null, 
      error: { message: 'Supabase not configured. Please add valid credentials to .env file.' } 
    })
  })
});

// Create the actual client or mock client
export const supabase = hasValidCredentials 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient();

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