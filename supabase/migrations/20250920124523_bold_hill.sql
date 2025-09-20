/*
  # Create food_logs table

  1. New Tables
    - `food_logs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles.id)
      - `food_name` (text, not null)
      - `calories` (numeric)
      - `proteins` (numeric)
      - `carbs` (numeric)
      - `fats` (numeric)
      - `image_url` (text, optional)
      - `logged_at` (timestamp with timezone)

  2. Security
    - Enable RLS on `food_logs` table
    - Add policies for authenticated users to manage their own food logs
*/

-- Create food_logs table
CREATE TABLE IF NOT EXISTS food_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  food_name text NOT NULL,
  calories numeric NOT NULL DEFAULT 0,
  proteins numeric NOT NULL DEFAULT 0,
  carbs numeric NOT NULL DEFAULT 0,
  fats numeric NOT NULL DEFAULT 0,
  image_url text,
  logged_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE food_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for food_logs table
CREATE POLICY "Users can read own food logs"
  ON food_logs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own food logs"
  ON food_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own food logs"
  ON food_logs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own food logs"
  ON food_logs
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);