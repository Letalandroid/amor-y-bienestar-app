
-- Create a table for diary entries
CREATE TABLE public.diary_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  mood TEXT,
  is_private BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to ensure maximum privacy
ALTER TABLE public.diary_entries ENABLE ROW LEVEL SECURITY;

-- Create policies for complete privacy - users can only access their own entries
CREATE POLICY "Users can view their own diary entries" 
  ON public.diary_entries 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own diary entries" 
  ON public.diary_entries 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own diary entries" 
  ON public.diary_entries 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own diary entries" 
  ON public.diary_entries 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create an index for better performance
CREATE INDEX idx_diary_entries_user_created ON public.diary_entries(user_id, created_at DESC);
