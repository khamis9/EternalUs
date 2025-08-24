import { Heart } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen bg-email-black flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-email-border rounded-full mb-6 animate-pulse">
          <Heart className="w-10 h-10 text-white" fill="currentColor" />
        </div>
        <h2 className="text-2xl font-bold text-email-border mb-2">
          Loading Our Love Story...
        </h2>
        <p className="text-email-textMuted">
          Preparing something beautiful for you 💕
        </p>
      </div>
    </div>
  )
}
