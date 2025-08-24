import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Post {
  id: string
  created_at: string
  content: string
  media_url?: string
  media_type?: 'image' | 'video' | 'audio'
  author: string
  author_username: string
  likes_count: number
  is_liked?: boolean
}

export interface User {
  id: string
  username: string
  email: string
  created_at: string
}

// Allowed users
export const ALLOWED_USERS = ['khamiso', 'reyrey', 'khamiso@eternalus.com', 'reyrey@eternalus.com']
