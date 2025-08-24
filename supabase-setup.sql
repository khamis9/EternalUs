-- ========================================
-- COMPLETE CLEAN SETUP FOR ETERNAL US
-- ========================================

-- Drop existing tables and triggers first
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP TABLE IF EXISTS post_likes CASCADE;
DROP TABLE IF EXISTS posts CASCADE;

-- Drop storage bucket if exists
DELETE FROM storage.buckets WHERE id = 'posts-media';

-- Drop all existing policies (only if tables exist)
DO $$
BEGIN
    -- Drop posts policies if table exists
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'posts') THEN
        DROP POLICY IF EXISTS "Allow authenticated users to read posts" ON posts;
        DROP POLICY IF EXISTS "Allow users to update their own posts" ON posts;
        DROP POLICY IF EXISTS "Allow users to insert their own posts" ON posts;
    END IF;
    
    -- Drop post_likes policies if table exists
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'post_likes') THEN
        DROP POLICY IF EXISTS "Allow authenticated users to read likes" ON post_likes;
        DROP POLICY IF EXISTS "Allow users to insert their own likes" ON post_likes;
        DROP POLICY IF EXISTS "Allow users to delete their own likes" ON post_likes;
    END IF;
    
    -- Drop storage policies
    DROP POLICY IF EXISTS "Allow authenticated users to upload media" ON storage.objects;
    DROP POLICY IF EXISTS "Allow public access to media" ON storage.objects;
END $$;

-- ========================================
-- CREATE TABLES
-- ========================================

-- Create posts table
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  content TEXT,
  media_url TEXT,
  media_type TEXT CHECK (media_type IN ('image', 'video', 'audio')),
  author UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  author_username TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0
);

-- Create likes table
CREATE TABLE post_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(post_id, user_id)
);

-- ========================================
-- CREATE INDEXES
-- ========================================

CREATE INDEX posts_created_at_idx ON posts(created_at DESC);
CREATE INDEX posts_author_idx ON posts(author);
CREATE INDEX post_likes_post_id_idx ON post_likes(post_id);
CREATE INDEX post_likes_user_id_idx ON post_likes(user_id);

-- ========================================
-- ENABLE ROW LEVEL SECURITY
-- ========================================

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;

-- ========================================
-- CREATE POLICIES FOR POSTS
-- ========================================

-- Allow authenticated users to read all posts
CREATE POLICY "Allow authenticated users to read posts" ON posts
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow users to insert their own posts
CREATE POLICY "Allow users to insert their own posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = author);

-- Allow users to update their own posts
CREATE POLICY "Allow users to update their own posts" ON posts
  FOR UPDATE USING (auth.uid() = author);

-- Allow users to delete their own posts
CREATE POLICY "Allow users to delete their own posts" ON posts
  FOR DELETE USING (auth.uid() = author);

-- ========================================
-- CREATE POLICIES FOR POST_LIKES
-- ========================================

-- Allow authenticated users to read likes
CREATE POLICY "Allow authenticated users to read likes" ON post_likes
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow users to insert their own likes
CREATE POLICY "Allow users to insert their own likes" ON post_likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own likes
CREATE POLICY "Allow users to delete their own likes" ON post_likes
  FOR DELETE USING (auth.uid() = user_id);

-- ========================================
-- CREATE STORAGE
-- ========================================

-- Create storage bucket for media files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('posts-media', 'posts-media', true);

-- Create storage policy to allow authenticated users to upload media
CREATE POLICY "Allow authenticated users to upload media" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'posts-media' AND 
    auth.role() = 'authenticated'
  );

-- Create storage policy to allow public access to media
CREATE POLICY "Allow public access to media" ON storage.objects
  FOR SELECT USING (bucket_id = 'posts-media');

-- ========================================
-- CREATE FUNCTIONS AND TRIGGERS
-- ========================================

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- You can add additional user setup logic here if needed
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ========================================
-- SETUP COMPLETE!
-- ========================================
