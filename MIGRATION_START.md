# Quick Start: Next.js Migration

## What Has Been Set Up

✅ **Next.js Configuration**
- `next.config.ts` configured for static export
- Output directory set to `build` (Netlify compatible)
- Image optimization disabled for static export
- Trailing slash enabled

✅ **Global Styles**
- Created `src/app/globals.css` with all your Tailwind and custom CSS
- Matches your current `src/index.css`

✅ **Root Layout**
- Created `src/app/layout.tsx` with Toaster from react-hot-toast
- Ready for your Navbar and Footer integration

✅ **Tailwind Config Updated**
- Added Next.js content paths (`src/pages`, `src/components`, `src/app`)
- All your custom colors and fonts preserved

✅ **PostCSS Config**
- Created for Tailwind processing

---

## Next Steps (In Order)

### Step 1: Update package.json Scripts

Replace your scripts section in `package.json`:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "add-slugs": "node scripts/add-slug-field.js"
}
```

### Step 2: Update Environment Variables

Rename variables in your `.env` file from:
- `REACT_APP_*` → `NEXT_PUBLIC_*`

Example:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project
# ... etc
```

### Step 3: Update Firebase Configuration

Create `src/lib/firebase.ts`:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

const secondaryApp = initializeApp(firebaseConfig, 'Secondary');
const secondaryAuth = getAuth(secondaryApp);

export { app, analytics, db, auth, storage, secondaryApp, secondaryAuth };
```

### Step 4: Create First Page (Home Page)

Create `src/app/page.tsx`:

```typescript
'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import RecentPosts from '../components/Articles/RecentPosts';
import CtaPosts from '../components/CTA/CtaPosts';
import Newsletter from '../components/Newsletter';

export default function HomePage() {
  return (
    <div className='max-w-screen flex flex-col min-h-screen text-akimbo-dark-900'>
      <div className='fixed z-20 top-0 h-fit w-full bg-akimbo-light bg-opacity-80'>
        <Navbar />
      </div>
      <HeroSection />
      <div className='flex-grow flex flex-col gap-10 p-5 md:w-10/12 mx-auto'>
        <CtaPosts />
        <RecentPosts />
        <div className='w-full flex flex-col lg:flex-row items-start justify-start gap-6 my-4'>
          <section className='w-full lg:w-3/6 flex flex-col items-start'>
            <h2 className='text-2xl font-medium mb-4'>community</h2>
            <p className='mb-2 lg:text-start'>
              Akimbo is more than just an online publishing platform, it's a vibrant community. Passionate readers, writers, critics, practitioners and artists, mostly based in Brussels, wanted to create an unpretentious, open space for young creatives to meet and exchange ideas.
            </p>
            <h3 className='mb-2 text-lg font-medium'>want to join?</h3>
            <p className='mb-2 lg:text-start'>
              We would love to meet other young, like-minded writers or practitioners.
              Send us an email with your idea or even a simple introduction. Hope to hear from you!
            </p>
            <a className='bg-akimbo-dark-900 font-sans px-3 py-2 text-akimbo-light' href='mailto:akimbo-mag@outlook.com'>
              contact us
            </a>
          </section>
          <section className='w-full lg:w-3/6 flex flex-col items-start'>
            <h2 className='text-2xl font-medium mb-4'>about akimbo</h2>
            <p>
              Akimbo is an online magazine and platform aiming to bring together <b>A</b>rt, <b>B</b>ooks, and <b>C</b>ulture.
              We focus on contemporary complexities, riveting essays, aesthetic inspirations, the internal turmoil of 20-year-olds and other stories waiting to be told.
            </p>
            <h3 className='my-2 text-lg font-medium'>our mission</h3>
            <p>
              Through an interdisciplinary and transhistorical approach we are committed to open up conversations on literature, contemporary art and popular culture, which should remain accessible to everybody regardless of their education and background.
            </p>
          </section>
        </div>
        <Newsletter />
      </div>
      <Footer />
    </div>
  );
}
```

**Note**: The `'use client'` directive is needed because this page likely uses hooks or other client-side features.

### Step 5: Test Your First Migration

Run:
```bash
npm run dev
```

Visit `http://localhost:3000` and you should see your home page!

---

## Migration Order

1. ✅ **Setup** (DONE) - Config files, styles, layout
2. 🔄 **Home Page** - Create `src/app/page.tsx`
3. **About Page** - Create `src/app/aboutus/page.tsx`
4. **Articles** - Create `src/app/articles/[type]/page.tsx`
5. **Article Details** - Create `src/app/articles/[type]/[articleId]/page.tsx`
6. **Diary** - Create `src/app/diary/page.tsx` and `diary/[id]/page.tsx`
7. **Login** - Create `src/app/login/page.tsx`
8. **Dashboard** - Create `src/app/dashboard/layout.tsx` and all dashboard pages
9. **Test & Build** - Run `npm run build` and verify
10. **Deploy** - Push to Netlify

---

## Important Notes

### Client Components
Any component that uses:
- React hooks (useState, useEffect, etc.)
- Browser APIs
- Event handlers
- Context providers

Must have `'use client'` at the top of the file.

### Static Export Limitations
- No server-side rendering
- No API routes
- All data fetching happens client-side
- Image optimization disabled (already configured)

### Routing Changes
Old React Router:
```jsx
<Route path="articles/:type" Component={ArticlesPage} />
```

New Next.js:
```
Create folder: src/app/articles/[type]/
Create file: src/app/articles/[type]/page.tsx
```

---

## Get Detailed Instructions

Read `MIGRATION_PLAN.md` for complete step-by-step instructions for all pages and features.

---

## Quick Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Test the build locally
npx serve build

# Start production server (if needed)
npm run start
```

