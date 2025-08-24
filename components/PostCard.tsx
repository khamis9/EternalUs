'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import { Heart, Image, Video, FileAudio, User, Clock } from 'lucide-react'
import { Post, supabase } from '@/lib/supabase'
import ReactPlayer from 'react-player'
import AudioPlayer from 'react-audio-player'
import { useAuth } from './AuthProvider'
import toast from 'react-hot-toast'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [isLiked, setIsLiked] = useState(post.is_liked || false)
  const [localLikesCount, setLocalLikesCount] = useState(post.likes_count || 0)
  const { user } = useAuth()

  // Update local state when post prop changes
  useEffect(() => {
    setIsLiked(post.is_liked || false)
    setLocalLikesCount(post.likes_count || 0)
  }, [post.is_liked, post.likes_count])

  const handleLike = async () => {
    if (!user) return

    try {
      if (isLiked) {
        // Unlike - optimistically update UI first
        setIsLiked(false)
        setLocalLikesCount(prev => Math.max(0, prev - 1))
        
        await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', post.id)
          .eq('user_id', user.id)
      } else {
        // Like - optimistically update UI first
        setIsLiked(true)
        setLocalLikesCount(prev => prev + 1)
        
        await supabase
          .from('post_likes')
          .insert({
            post_id: post.id,
            user_id: user.id
          })
      }
    } catch (error) {
      console.error('Error toggling like:', error)
      toast.error('Failed to update like')
      // Revert optimistic update on error
      if (isLiked) {
        setIsLiked(false)
        setLocalLikesCount(prev => Math.max(0, prev - 1))
      } else {
        setIsLiked(true)
        setLocalLikesCount(prev => prev + 1)
      }
    }
  }



  const renderMedia = () => {
    if (!post.media_url) return null

    switch (post.media_type) {
      case 'image':
        return (
          <div className="relative rounded-lg overflow-hidden bg-email-darker">
            {!imageLoaded && !imageError && (
              <div className="flex items-center justify-center h-48 bg-email-darker">
                <div className="w-8 h-8 border-2 border-email-border border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {imageError && (
              <div className="flex items-center justify-center h-48 bg-email-darker text-email-textMuted">
                <Image className="w-8 h-8 mr-2" />
                <span>Failed to load image</span>
              </div>
            )}
            <img
              src={post.media_url}
              alt="Post media"
              className={`w-full h-auto rounded-lg transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          </div>
        )

      case 'video':
        return (
          <div className="relative rounded-lg overflow-hidden bg-email-darker">
            <ReactPlayer
              url={post.media_url}
              width="100%"
              height="auto"
              controls
              light
              style={{ borderRadius: '8px' }}
            />
          </div>
        )

      case 'audio':
        return (
          <div className="bg-email-darker rounded-lg p-4 border border-email-border">
            <div className="flex items-center space-x-3 mb-3">
              <FileAudio className="w-6 h-6 text-email-border" />
              <span className="text-email-text font-medium">Audio Message</span>
            </div>
            <AudioPlayer
              src={post.media_url}
              controls
              className="w-full"
            />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="gothic-card p-6 mb-6"
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      {/* Post Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-email-border rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-medium text-email-text">
              {post.author_username}
            </p>
            <div className="flex items-center space-x-1 text-sm text-email-textMuted">
              <Clock className="w-3 h-3" />
              <span>
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className={`flex items-center space-x-1 transition-colors ${
            isLiked 
              ? 'text-email-border' 
              : 'text-email-textMuted hover:text-email-border'
          }`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          {localLikesCount > 0 && (
            <span className="text-sm">{localLikesCount}</span>
          )}
        </motion.button>
      </div>

      {/* Post Content */}
      {post.content && (
        <div className="mb-4">
                  <p className="elegant-text text-email-text leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
        </div>
      )}

             {/* Media */}
       {renderMedia()}
    </motion.div>
  )
}
