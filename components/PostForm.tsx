'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Heart, Image, Video, Mic, X, Upload, FileAudio } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './AuthProvider'
import toast from 'react-hot-toast'

interface PostFormProps {
  onPostCreated: () => void
}

export default function PostForm({ onPostCreated }: PostFormProps) {
  const [content, setContent] = useState('')
  const [mediaFile, setMediaFile] = useState<File | null>(null)
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'audio' | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useAuth()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    const fileType = file.type
    let type: 'image' | 'video' | 'audio' | null = null

    if (fileType.startsWith('image/')) {
      type = 'image'
    } else if (fileType.startsWith('video/')) {
      type = 'video'
    } else if (fileType.startsWith('audio/')) {
      type = 'audio'
    } else {
      toast.error('Unsupported file type. Please upload an image, video, or audio file.')
      return
    }

    setMediaFile(file)
    setMediaType(type)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
      'video/*': ['.mp4', '.webm', '.mov'],
      'audio/*': ['.mp3', '.wav', '.ogg', '.m4a']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  })

  const removeMedia = () => {
    setMediaFile(null)
    setMediaType(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() && !mediaFile) {
      toast.error('Please add some content or media to your post')
      return
    }

    setIsSubmitting(true)

    try {
      let mediaUrl = null

      // Upload media if present
      if (mediaFile && mediaType) {
        const fileExt = mediaFile.name.split('.').pop()
        const fileName = `${Date.now()}.${fileExt}`
        const filePath = `media/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('posts-media')
          .upload(filePath, mediaFile)

        if (uploadError) {
          throw uploadError
        }

        const { data: { publicUrl } } = supabase.storage
          .from('posts-media')
          .getPublicUrl(filePath)

        mediaUrl = publicUrl
      }

      // Create post
      const { data: newPost, error: postError } = await supabase
        .from('posts')
        .insert({
          content: content.trim(),
          media_url: mediaUrl,
          media_type: mediaType,
          author: user?.id,
          author_username: user?.email?.split('@')[0] || 'unknown'
        })
        .select()
        .single()

      if (postError) {
        throw postError
      }

      // Send email notification
      try {
        await fetch('/api/notify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            post: newPost,
            authorUsername: user?.email?.split('@')[0] || 'unknown'
          }),
        })
      } catch (error) {
        console.error('Failed to send notification:', error)
        // Don't fail the post creation if notification fails
      }

      // Reset form
      setContent('')
      setMediaFile(null)
      setMediaType(null)

      toast.success('Post created with love! 💕')
      onPostCreated()

    } catch (error) {
      console.error('Error creating post:', error)
      toast.error('Failed to create post. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="gothic-card p-6 mb-6"
      whileHover={{ 
        scale: 1.01,
        transition: { duration: 0.2 }
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Content Input */}
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share a moment of our love story... 💕"
            className="gothic-input w-full h-32 resize-none"
            maxLength={500}
          />
          <div className="text-right mt-1">
            <span className="text-sm text-email-textMuted">
              {content.length}/500
            </span>
          </div>
        </div>

        {/* Media Upload */}
        {!mediaFile && (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-email-border bg-email-border/10'
                : 'border-email-border hover:border-email-border hover:bg-email-darker'
            } bg-email-dark/30`}
          >
            <input {...getInputProps()} />
            <Upload className="w-8 h-8 text-email-border mx-auto mb-2" />
            <p className="text-email-text mb-1">
              {isDragActive ? 'Drop your media here' : 'Click or drag to upload media'}
            </p>
            <p className="text-sm text-email-textMuted">
              Images, videos, or audio files (max 10MB)
            </p>
          </div>
        )}

        {/* Media Preview */}
        {mediaFile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-email-darker rounded-lg p-4 border border-email-border"
          >
            <button
              type="button"
              onClick={removeMedia}
              className="absolute top-2 right-2 w-6 h-6 bg-email-dark rounded-full flex items-center justify-center hover:bg-email-darker transition-colors"
            >
              <X className="w-4 h-4 text-email-textMuted" />
            </button>
            
            <div className="flex items-center space-x-3">
              {mediaType === 'image' && <Image className="w-6 h-6 text-email-border" />}
              {mediaType === 'video' && <Video className="w-6 h-6 text-email-border" />}
              {mediaType === 'audio' && <FileAudio className="w-6 h-6 text-email-border" />}
              <div>
                <p className="text-email-text font-medium">{mediaFile.name}</p>
                <p className="text-sm text-email-textMuted">
                  {(mediaFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting || (!content.trim() && !mediaFile)}
          className="gothic-button w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Sharing Our Love...</span>
            </>
          ) : (
            <>
              <Heart className="w-5 h-5" />
              <span>Share Our Moment</span>
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  )
}
