# Eternal Us - Anniversary Website 💕

A beautiful, romantic anniversary website built with Next.js and Supabase, featuring a dark gothic romance theme. This private platform allows two lovers to share their journey together with posts, media, and real-time updates.

## ✨ Features

- **🔐 Secure Authentication**: Only two users (khamiso and reyrey) can access the site
- **⏰ Live Day Counter**: Shows time since June 25, 2025, updating every second
- **📱 Instagram-Style Feed**: Beautiful posts with text, images, videos, and audio
- **📧 Email Notifications**: Get notified when your love shares a new post
- **🎨 Gothic Romance Theme**: Dark, elegant design with smooth animations
- **📱 Mobile-First**: Fully responsive design optimized for iPhone 8 Plus and all devices
- **🔄 Real-Time Updates**: Posts appear instantly with live timestamps

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom gothic theme
- **Animations**: Framer Motion
- **Backend**: Supabase (Database, Auth, Storage)
- **Email**: Resend
- **Deployment**: Vercel/Netlify/GitHub Pages

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd eternal-us-anniversary
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

# Email Configuration (Resend)
RESEND_API_KEY=your_resend_api_key_here

# Anniversary Date (June 25, 2025)
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
   - Create two users with these emails:
     - `khamiso@eternalus.com`
     - `reyrey@eternalus.com`
   - Set passwords for both users

4. **Configure Storage**:
   - Go to Storage
   - Create a bucket named `posts-media`
   - Set it to public

### 4. Email Setup (Optional)

1. **Sign up for Resend**:
   - Go to [resend.com](https://resend.com)
   - Create an account and get your API key

2. **Add API Key to Environment**:
   ```bash
   RESEND_API_KEY=your_resend_api_key_here
   ```

3. **Email Addresses Configured**:
   - Khamiso: khamishussein2003@gmail.com (for testing)
   - Reyrey: Email removed for surprise (can be added later)

4. **Test Notifications**:
   - Create a new post
   - Both users will receive beautiful gothic-themed email notifications

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your love story! 💕

## 📱 Mobile Optimization

The website is fully optimized for mobile devices, especially iPhone 8 Plus:

- Responsive design that works on all screen sizes
- Touch-friendly interface
- Optimized loading times
- Mobile-first animations

## 🎨 Customization

### Colors and Theme

The gothic romance theme uses custom colors defined in `tailwind.config.js`:

- **Gothic Red**: `#dc2626` - Primary accent color
- **Dark Background**: `#0f172a` - Deep dark background
- **Rose Accents**: `#be123c` - Romantic rose colors

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

### Option 1: Vercel (Recommended)

1. **Connect to Vercel**:
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Add Environment Variables**:
   - Go to your Vercel dashboard
   - Add all environment variables from `.env.local`

3. **Deploy**:
   ```bash
   vercel --prod
   ```

### Option 2: Netlify

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Drag the `out` folder to Netlify
   - Or connect your GitHub repo

3. **Add Environment Variables** in Netlify dashboard

### Option 3: GitHub Pages

1. **Update next.config.js**:
   ```javascript
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   }
   ```

2. **Build and deploy**:
   ```bash
   npm run build
   # Upload the out folder to GitHub Pages
   ```

## 🔧 Configuration

### Authentication

Only two users can access the site:
- **khamiso** - Username for first user
- **reyrey** - Username for second user

To change usernames, edit `lib/supabase.ts`:

```typescript
export const ALLOWED_USERS = ['your-username-1', 'your-username-2']
```

### Anniversary Date

Update the anniversary date in `.env.local`:

```env
NEXT_PUBLIC_ANNIVERSARY_DATE=2025-06-25T00:00:00.000Z
```

### Email Notifications

To customize email notifications:

1. Edit `app/api/notify/route.ts`
2. Update the email template HTML
3. Change recipient email addresses

## 📁 Project Structure

```
eternal-us-anniversary/
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
   - Verify Resend API key is correct
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

**Built with 💕 for Eternal Us**
