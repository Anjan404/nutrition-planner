/*
  # Fix profiles table ID column type

  1. Changes
    - Drop existing profiles table if it exists with wrong schema
    - Recreate profiles table with correct UUID id column
    - Set up proper foreign key relationship with auth.users
    - Recreate all RLS policies
    - Add proper indexes and constraints

  2. Security
    - Enable RLS on profiles table
    - Add policies for authenticated users to manage their own data
*/

-- Drop existing profiles table if it exists (this will cascade to dependent objects)
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Create profiles table with correct UUID id column
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

-- Create function to handle updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create index on email for faster lookups
CREATE INDEX profiles_email_idx ON public.profiles(email);