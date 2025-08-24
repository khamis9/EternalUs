'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Clock, Calendar } from 'lucide-react'

const ANNIVERSARY_DATE = new Date('2025-06-25T00:00:00.000Z')

export default function DayCounter() {
  const [timeData, setTimeData] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const diff = now.getTime() - ANNIVERSARY_DATE.getTime()
      
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        
        setTimeData({ days, hours, minutes, seconds })
      }
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    
    return () => clearInterval(interval)
  }, [])

  const timeUnits = [
    { label: 'Days', value: timeData.days, icon: Calendar },
    { label: 'Hours', value: timeData.hours, icon: Clock },
    { label: 'Minutes', value: timeData.minutes, icon: Clock },
    { label: 'Seconds', value: timeData.seconds, icon: Clock }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="gothic-card p-6 mb-6"
    >
      <div className="text-center mb-6">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
            boxShadow: [
              "0 0 20px rgba(220, 38, 38, 0.3)",
              "0 0 30px rgba(220, 38, 38, 0.5)",
              "0 0 20px rgba(220, 38, 38, 0.3)"
            ]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="inline-flex items-center justify-center w-16 h-16 bg-email-border rounded-full mb-4"
        >
          <Heart className="w-8 h-8 text-white" fill="currentColor" />
        </motion.div>
        <h2 className="gothic-text text-2xl font-bold mb-2">
          Our Eternal Journey
        </h2>
        <p className="elegant-text text-email-text">
          Since June 25, 2025
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="text-center"
          >
            <div className="bg-email-darker rounded-lg p-4 border border-email-border">
              <div className="flex items-center justify-center mb-2">
                <unit.icon className="w-5 h-5 text-email-border" />
              </div>
                             <motion.div
                 key={unit.value}
                 initial={{ scale: 1.2, color: '#dc2626' }}
                 animate={{ scale: 1, color: '#e0e0e0' }}
                 transition={{ duration: 0.3 }}
                 className="text-2xl font-bold text-email-text mb-1"
                 whileHover={{ 
                   scale: 1.1, 
                   color: '#dc2626',
                   textShadow: '0 0 10px rgba(220, 38, 38, 0.8)'
                 }}
               >
                 {unit.value.toString().padStart(2, '0')}
               </motion.div>
              <div className="text-sm text-email-textMuted font-medium">
                {unit.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-center mt-6"
      >
        <p className="elegant-text text-sm text-email-textMuted">
          Every moment with you is a blessing 💕
        </p>
      </motion.div>
    </motion.div>
  )
}
