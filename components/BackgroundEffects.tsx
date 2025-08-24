'use client'

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-5">
      {/* Static rose pattern - top left */}
      <div className="absolute top-8 left-8 text-3xl text-email-border/20 static-emoji">
        🌹
      </div>
      <div className="absolute top-16 left-20 text-2xl text-email-border/15 static-emoji">
        🌹
      </div>
      <div className="absolute top-24 left-12 text-xl text-email-border/10 static-emoji">
        🌹
      </div>
      
      {/* Static star pattern - top right */}
      <div className="absolute top-12 right-12 text-2xl text-email-border/20 static-emoji">
        ⭐
      </div>
      <div className="absolute top-20 right-20 text-xl text-email-border/15 static-emoji">
        ⭐
      </div>
      <div className="absolute top-28 right-16 text-lg text-email-border/10 static-emoji">
        ⭐
      </div>
      
      {/* Static sparkle pattern - bottom left */}
      <div className="absolute bottom-16 left-16 text-2xl text-email-border/20 static-emoji">
        ✨
      </div>
      <div className="absolute bottom-24 left-24 text-xl text-email-border/15 static-emoji">
        ✨
      </div>
      <div className="absolute bottom-32 left-20 text-lg text-email-border/10 static-emoji">
        ✨
      </div>
      
      {/* Static heart pattern - bottom right */}
      <div className="absolute bottom-12 right-16 text-2xl text-email-border/20 static-emoji">
        ♥
      </div>
      <div className="absolute bottom-20 right-24 text-xl text-email-border/15 static-emoji">
        ♥
      </div>
      <div className="absolute bottom-28 right-20 text-lg text-email-border/10 static-emoji">
        ♥
      </div>
      
      {/* Center area patterns - subtle */}
      <div className="absolute top-1/3 left-1/4 text-lg text-email-border/8 static-emoji">
        🌹
      </div>
      <div className="absolute top-1/3 right-1/4 text-lg text-email-border/8 static-emoji">
        ⭐
      </div>
      <div className="absolute bottom-1/3 left-1/3 text-lg text-email-border/8 static-emoji">
        ✨
      </div>
      <div className="absolute bottom-1/3 right-1/3 text-lg text-email-border/8 static-emoji">
        ♥
      </div>
      
      {/* Corner accents */}
      <div className="absolute top-4 left-4 text-sm text-email-border/12 static-emoji">
        ♥
      </div>
      <div className="absolute top-4 right-4 text-sm text-email-border/12 static-emoji">
        🌹
      </div>
      <div className="absolute bottom-4 left-4 text-sm text-email-border/12 static-emoji">
        ⭐
      </div>
      <div className="absolute bottom-4 right-4 text-sm text-email-border/12 static-emoji">
        ✨
      </div>
    </div>
  )
}
