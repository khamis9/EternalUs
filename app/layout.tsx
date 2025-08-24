import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eternal Us - Our Love Story',
  description: 'A romantic anniversary website celebrating our eternal love',
  keywords: 'anniversary, love, romance, gothic, eternal',
  authors: [{ name: 'Eternal Us' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#dc2626',
  icons: {
    icon: [
      { url: '/image.png', sizes: '32x32', type: 'image/png' },
      { url: '/image.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/image.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/image.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Standard favicon */}
        <link rel="icon" href="/image.png?v=2" type="image/png" sizes="32x32" />
        <link rel="icon" href="/image.png?v=2" type="image/png" sizes="16x16" />
        
        {/* Apple touch icon for iOS home screen */}
        <link rel="apple-touch-icon" href="/image.png?v=2" sizes="180x180" />
        <link rel="apple-touch-icon" href="/image.png?v=2" sizes="152x152" />
        <link rel="apple-touch-icon" href="/image.png?v=2" sizes="144x144" />
        <link rel="apple-touch-icon" href="/image.png?v=2" sizes="120x120" />
        
        {/* Android and other mobile devices */}
        <link rel="icon" href="/image.png?v=2" type="image/png" sizes="192x192" />
        <link rel="icon" href="/image.png?v=2" type="image/png" sizes="512x512" />
        
        {/* Microsoft tiles */}
        <meta name="msapplication-TileImage" content="/image.png?v=2" />
        <meta name="msapplication-TileColor" content="#0a0a0a" />
        
        {/* Mobile web app settings */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Eternal Us" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Theme colors */}
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="msapplication-navbutton-color" content="#0a0a0a" />
        
        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-email-black">
          {children}
        </div>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1a1a1a',
              color: '#e0e0e0',
              border: '2px solid #dc2626',
              borderRadius: '12px',
              boxShadow: '0 10px 30px rgba(220, 38, 38, 0.3)',
              fontFamily: 'Georgia, serif',
              fontSize: '14px',
              padding: '16px 20px',
            },
            success: {
              iconTheme: {
                primary: '#dc2626',
                secondary: '#e0e0e0',
              },
              style: {
                background: '#0f0f0f',
                border: '2px solid #dc2626',
              },
            },
            error: {
              iconTheme: {
                primary: '#dc2626',
                secondary: '#e0e0e0',
              },
              style: {
                background: '#0f0f0f',
                border: '2px solid #dc2626',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
