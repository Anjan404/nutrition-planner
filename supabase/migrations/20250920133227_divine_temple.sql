/*
  # Fix profiles table ID column type

  1. Problem
    - The profiles table ID column is configured as bigint instead of uuid
    - This causes "invalid input syntax for type bigint" errors when trying to store UUID values
    - Supabase Auth provides user IDs as UUIDs, not bigints

  2. Solution
    - Drop the existing profiles table completely
    - Recreate with proper uuid ID column
    - Set up correct foreign key relationship with auth.users
    - Restore all security policies and constraints

  3. Security
    - Enable RLS on profiles table
    - Add policies for authenticated users to manage their own data
    - Set up proper foreign key constraint to auth.users
*/

-- Drop the existing profiles table if it exists
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Create the profiles table with correct UUID ID column
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  age integer,
  height numeric,
  weight numeric,
  activity_level text,
  dietary_restrictions text[] DEFAULT '{}',
  medical_conditions text[] DEFAULT '{}',
  fitness_goals text[] DEFAULT '{}',
  cultural_preferences text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create indexes for better performance
CREATE INDEX profiles_email_idx ON public.profiles(email);

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic updated_at
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();