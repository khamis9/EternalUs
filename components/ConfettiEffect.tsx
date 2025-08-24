'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface ConfettiPiece {
  id: number
  x: number
  y: number
  rotation: number
  color: string
  size: number
}

interface ConfettiEffectProps {
  trigger: boolean
}

export default function ConfettiEffect({ trigger }: ConfettiEffectProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    if (trigger) {
      const colors = ['#dc2626', '#e11d48', '#be123c', '#f43f5e', '#e0e0e0']
      const newPieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 0.5 + 0.3
      }))

      setPieces(newPieces)

      // Clear pieces after animation
      setTimeout(() => setPieces([]), 3000)
    }
  }, [trigger])

  if (pieces.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: `${piece.size}rem`,
            height: `${piece.size}rem`,
            backgroundColor: piece.color,
            borderRadius: '2px'
          }}
          initial={{ y: -10, opacity: 1, scale: 0 }}
          animate={{
            y: 110,
            opacity: [1, 1, 0],
            scale: [0, 1, 0.8],
            rotate: [piece.rotation, piece.rotation + 360]
          }}
          transition={{
            duration: 3,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  )
}
