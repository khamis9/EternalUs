'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LogOut, Heart, Sparkles } from 'lucide-react'
import { AuthProvider, useAuth } from '@/components/AuthProvider'
import LoginForm from '@/components/LoginForm'
import DayCounter from '@/components/DayCounter'
import PostForm from '@/components/PostForm'
import PostCard from '@/components/PostCard'
import HeartParticles from '@/components/HeartParticles'
import BackgroundEffects from '@/components/BackgroundEffects'
import ConfettiEffect from '@/components/ConfettiEffect'
import { supabase, Post } from '@/lib/supabase'
import toast from 'react-hot-toast'

function Dashboard() {
  const { user, signOut } = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)

  const fetchPosts = async () => {
    try {
      // First, get all posts
      const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      // Get all likes count for each post
      const { data: allLikes } = await supabase
        .from('post_likes')
        .select('post_id')

      // Count likes for each post
      const likeCounts = new Map()
      allLikes?.forEach(like => {
        likeCounts.set(like.post_id, (likeCounts.get(like.post_id) || 0) + 1)
      })

      // Get likes for the current user
      const { data: userLikes } = await supabase
        .from('post_likes')
        .select('post_id')
        .eq('user_id', user?.id)

      const likedPostIds = new Set(userLikes?.map(like => like.post_id) || [])

      // Combine posts with like information
      const postsWithLikes = posts?.map(post => ({
        ...post,
        is_liked: likedPostIds.has(post.id),
        likes_count: likeCounts.get(post.id) || 0
      })) || []

      setPosts(postsWithLikes)
    } catch (error) {
      console.error('Error fetching posts:', error)
      toast.error('Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchPosts()
      
      // Set up real-time subscription for posts and likes
      const channel = supabase
        .channel('posts_and_likes')
        .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'posts' },
          () => {
            fetchPosts()
          }
        )
        .on('postgres_changes',
          { event: '*', schema: 'public', table: 'post_likes' },
          () => {
            fetchPosts()
          }
        )
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }
  }, [user])

  const handleSignOut = async () => {
    await signOut()
    toast.success('See you soon, my love! 💕')
  }

  const handlePostCreated = () => {
    fetchPosts()
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 100)
  }

  if (!user) {
    return <LoginForm />
  }

  return (
    <div className="min-h-screen bg-email-black">
      <HeartParticles />
      <BackgroundEffects />
      <ConfettiEffect trigger={showConfetti} />
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="gothic-card mx-4 mt-4 p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 10px rgba(220, 38, 38, 0.3)",
                  "0 0 20px rgba(220, 38, 38, 0.6)",
                  "0 0 10px rgba(220, 38, 38, 0.3)"
                ]
              }}
              transition={{ 
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-8 h-8 bg-email-border rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
            <div>
              <h1 className="gothic-text text-2xl font-bold">
                Eternal Us
              </h1>
              <p className="elegant-text text-sm text-email-textMuted">
                Welcome back, {user.email?.split('@')[0]} 💕
              </p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSignOut}
            className="flex items-center space-x-2 px-4 py-2 bg-email-darker hover:bg-email-dark rounded-lg transition-colors border border-email-border"
            whileHover={{ 
              boxShadow: "0 0 15px rgba(220, 38, 38, 0.4)",
              borderColor: "rgba(220, 38, 38, 0.8)"
            }}
          >
            <LogOut className="w-4 h-4 text-email-textMuted" />
            <span className="text-email-text text-sm">Sign Out</span>
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Day Counter */}
        <DayCounter />

        {/* Post Form */}
        <PostForm onPostCreated={handlePostCreated} />

        {/* Posts Feed */}
        <div className="space-y-6">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="gothic-card p-8 text-center"
            >
              <div className="flex items-center justify-center space-x-2">
                <motion.div 
                  className="w-6 h-6 border-2 border-email-border border-t-transparent rounded-full"
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 1, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
                <span className="text-email-text">Loading our love story...</span>
              </div>
            </motion.div>
          ) : posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="gothic-card p-8 text-center"
            >
              <motion.div 
                className="inline-flex items-center justify-center w-16 h-16 bg-email-border rounded-full mb-4 shadow-lg"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Heart className="w-8 h-8 text-white" fill="currentColor" />
              </motion.div>
              <h3 className="gothic-text text-xl font-bold mb-2">
                Our Story Begins
              </h3>
              <p className="elegant-text text-email-textMuted">
                Share your first moment of love and watch our story unfold...
              </p>
            </motion.div>
          ) : (
            posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))
          )}
        </div>

                 {/* Footer */}
         <motion.footer
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1, duration: 0.5 }}
           className="text-center mt-12 mb-8"
         >
           <p className="elegant-text text-sm text-email-textMuted">
             Forever & Always • Eternal Us • 2025
           </p>
         </motion.footer>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  )
}
