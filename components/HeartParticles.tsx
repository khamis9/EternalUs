'use client'

export default function HeartParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {/* Static heart pattern - scattered around */}
      <div className="absolute top-20 left-1/4 text-xl text-email-border/25 static-emoji">
        ♥
      </div>
      <div className="absolute top-32 right-1/3 text-lg text-email-border/20 static-emoji">
        ♥
      </div>
      <div className="absolute top-40 left-1/2 text-sm text-email-border/15 static-emoji">
        ♥
      </div>
      
      <div className="absolute bottom-32 left-1/3 text-lg text-email-border/25 static-emoji">
        ♥
      </div>
      <div className="absolute bottom-24 right-1/4 text-xl text-email-border/20 static-emoji">
        ♥
      </div>
      <div className="absolute bottom-36 right-1/2 text-sm text-email-border/15 static-emoji">
        ♥
      </div>
      
      {/* Center area hearts - very subtle */}
      <div className="absolute top-1/2 left-1/6 text-sm text-email-border/10 static-emoji">
        ♥
      </div>
      <div className="absolute top-1/2 right-1/6 text-sm text-email-border/10 static-emoji">
        ♥
      </div>
      <div className="absolute bottom-1/2 left-1/6 text-sm text-email-border/10 static-emoji">
        ♥
      </div>
      <div className="absolute bottom-1/2 right-1/6 text-sm text-email-border/10 static-emoji">
        ♥
      </div>
    </div>
  )
}
