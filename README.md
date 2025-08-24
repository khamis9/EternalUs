# Eternal Us - Anniversary Website 💕

A beautiful, romantic anniversary website built with Next.js and Supabase, featuring a dark gothic romance theme. This private platform allows two lovers to share their journey together with posts, media, and real-time updates.

## ✨ Features

- **🔐 Secure Authentication**: Private access for two users
- **⏰ Live Day Counter**: Shows time since your anniversary date
- **📱 Instagram-Style Feed**: Beautiful posts with text, images, videos, and audio
- **📧 Email Notifications**: Get notified when your love shares a new post
- **🎨 Gothic Romance Theme**: Dark, elegant design with smooth animations
- **📱 Mobile-First**: Fully responsive design optimized for all devices
- **🔄 Real-Time Updates**: Posts appear instantly with live timestamps

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom gothic theme
- **Animations**: Framer Motion
- **Backend**: Supabase (Database, Auth, Storage)
- **Email**: Brevo (formerly Sendinblue)
- **Deployment**: Vercel/Netlify/GitHub Pages

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd EternalUs
npm install
```

### 2. Environment Setup

Copy the environment template and fill in your values:

```bash
cp env.example .env.local
```

Update `.env.local` with your credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Email Configuration (Brevo)
BREVO_API_KEY=your_brevo_api_key_here

# Anniversary Date
NEXT_PUBLIC_ANNIVERSARY_DATE=2025-06-25T00:00:00.000Z
```

### 3. Supabase Setup

1. **Create a Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Copy your project URL and anon key

2. **Run Database Setup**:
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Run the contents of `supabase-setup.sql`

3. **Create Users**:
   - Go to Authentication > Users
   - Create two users with your preferred emails
   - Set passwords for both users

4. **Configure Storage**:
   - Go to Storage
   - Create a bucket named `posts-media`
   - Set it to public

### 4. Email Setup

1. **Sign up for Brevo**:
   - Go to [brevo.com](https://brevo.com)
   - Create an account and get your API key

2. **Add API Key to Environment**:
   ```bash
   BREVO_API_KEY=your_brevo_api_key_here
   ```

3. **Configure Email Addresses**:
   - Update the notification API with your email addresses
   - Test notifications by creating a new post

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your love story! 💕

## 📱 Mobile Optimization

The website is fully optimized for mobile devices:

- Responsive design that works on all screen sizes
- Touch-friendly interface
- Optimized loading times
- Mobile-first animations

## 🎨 Customization

### Colors and Theme

The gothic romance theme uses custom colors defined in `tailwind.config.js`:

- **Dark Background**: Deep dark backgrounds
- **Accent Colors**: Romantic accent colors
- **Gothic Elements**: Elegant gothic styling

### Fonts

- **Gothic**: Playfair Display - For headings and romantic text
- **Elegant**: Crimson Text - For body text and quotes
- **Modern**: Inter - For UI elements

### Animations

Custom animations include:
- Heartbeat effects
- Floating elements
- Glow effects
- Smooth transitions

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Import your repository

2. **Add Environment Variables**:
   - Go to your Vercel dashboard
   - Add all environment variables from `.env.local`

3. **Deploy**:
   - Vercel will automatically deploy your site
   - Every push to GitHub triggers a new deployment

## 🔧 Configuration

### Authentication

Configure allowed users in `lib/supabase.ts`:

```typescript
export const ALLOWED_USERS = ['your-username-1', 'your-username-2']
```

### Anniversary Date

Update the anniversary date in `.env.local`:

```env
NEXT_PUBLIC_ANNIVERSARY_DATE=your-anniversary-date-here
```

## 📁 Project Structure

```
EternalUs/
├── app/
│   ├── api/notify/route.ts    # Email notification API
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main dashboard
├── components/
│   ├── AuthProvider.tsx       # Authentication context
│   ├── DayCounter.tsx         # Anniversary counter
│   ├── LoginForm.tsx          # Login form
│   ├── PostCard.tsx           # Individual post display
│   └── PostForm.tsx           # Post creation form
├── lib/
│   └── supabase.ts            # Supabase client & types
├── supabase-setup.sql         # Database setup script
└── README.md                  # This file
```

## 🔒 Security

- **Authentication**: Supabase Auth with email/password
- **Authorization**: Only allowed users can access the site
- **Data Protection**: Row Level Security (RLS) enabled
- **Media Security**: Secure file uploads with size limits

## 🎯 Features in Detail

### Day Counter
- Live countdown showing days, hours, minutes, and seconds
- Updates every second
- Beautiful animated display

### Post System
- Text posts with character limits
- Image uploads (JPEG, PNG, GIF, WebP)
- Video uploads (MP4, WebM, MOV)
- Audio uploads (MP3, WAV, OGG, M4A)
- File size limit: 10MB per file

### Real-Time Features
- Instant post updates
- Live timestamps
- Real-time notifications

### Email Notifications
- Beautiful gothic-themed email templates
- Sent when new posts are created
- Includes post preview and author

## 🐛 Troubleshooting

### Common Issues

1. **Authentication Errors**:
   - Ensure users are created in Supabase
   - Check email/password combinations
   - Verify allowed usernames in code

2. **Media Upload Issues**:
   - Check Supabase storage bucket exists
   - Verify storage policies are set correctly
   - Ensure file size is under 10MB

3. **Email Notifications Not Working**:
   - Verify Brevo API key is correct
   - Check email addresses in notification API
   - Ensure API route is accessible

4. **Build Errors**:
   - Run `npm install` to ensure all dependencies
   - Check TypeScript errors
   - Verify environment variables

## 💝 Love Notes

This website was created with love and care for celebrating your eternal journey together. Every feature is designed to enhance your romantic experience and preserve your precious moments.

May your love story continue to grow more beautiful with each passing day! 💕

## 📄 License

This project is private and created for personal use. Feel free to customize it for your own love story!

---

**Built with �� for Eternal Us**
