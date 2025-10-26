# Next.js Migration Plan for Akimbo

## Overview
This document outlines a step-by-step plan to migrate from React SPA (Create React App) to Next.js 16 with static export configuration.

## Current Architecture
- **Framework**: React with CRA (react-scripts)
- **Routing**: react-router-dom v6
- **Backend**: Firebase (Firestore, Auth, Storage)
- **Styling**: Tailwind CSS
- **Build Output**: `build/` directory (static files)

## Target Architecture
- **Framework**: Next.js 16
- **Routing**: App Router (file-based routing)
- **Export Mode**: Static export (`output: 'export'`)
- **Backend**: Firebase (client-side)
- **Styling**: Tailwind CSS
- **Build Output**: `build/` directory (compatible with Netlify)

---

## Phase 1: Preparation (Day 1)

### 1.1 Update Dependencies
```bash
# Install Next.js CLI and required dependencies
npm install next@16.0.0 react@18.2.0 react-dom@18.2.0 --save
npm install -D @types/node @types/react @types/react-dom
```

### 1.2 Update package.json scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "export": "next build",
    "lint": "next lint"
  }
}
```

### 1.3 Environment Variables
- Keep `.env` file as is (Next.js reads `NEXT_PUBLIC_*` instead of `REACT_APP_*`)
- Update Firebase config to use `NEXT_PUBLIC_*` prefix

### 1.4 Update Tailwind Config
- Update `tailwind.config.js` to include Next.js paths
- Add PostCSS config if needed

### 1.5 Create tsconfig.json (optional but recommended)
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## Phase 2: Folder Structure Setup (Day 1-2)

### 2.1 Current Structure
```
src/
├── app/                  # Already exists, start here
├── components/           # Keep as-is
├── layouts/             # Keep as-is
├── pages/               # Convert to app/ structure
├── services/            # Keep as-is
├── hooks/               # Keep as-is
├── utils/               # Keep as-is
└── assets/              # Keep as-is
```

### 2.2 Target Next.js Structure
```
src/app/                 # App Router root
├── layout.tsx           # Root layout (with Navbar/Footer)
├── page.tsx             # Home page (replaces index route)
├── aboutus/
│   └── page.tsx
├── articles/
│   ├── [type]/
│   │   ├── page.tsx
│   │   └── [articleId]/
│   │       └── page.tsx
├── diary/
│   ├── page.tsx
│   └── [id]/
│       └── page.tsx
├── dashboard/
│   ├── layout.tsx       # Dashboard layout wrapper
│   ├── page.tsx         # Dashboard home
│   ├── overview/
│   │   └── page.tsx
│   ├── articles/
│   │   ├── page.tsx
│   │   ├── create/
│   │   │   └── page.tsx
│   │   ├── preview/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   └── update/
│   │       └── [id]/
│   │           └── page.tsx
│   ├── diary/
│   ├── users/
│   └── cta/
└── (auth)/              # Route group for auth (optional)
    └── login/
        └── page.tsx
```

### 2.3 Create Global Styles
- Move `src/index.css` to `src/app/globals.css`
- Import in root layout

---

## Phase 3: Core Setup (Day 2)

### 3.1 Update Firebase Configuration
Create `src/lib/firebase.ts`:
```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // ... rest of config
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

### 3.2 Create Root Layout
File: `src/app/layout.tsx`
```typescript
import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Akimbo',
  description: 'Art, Books, and Culture',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
```

### 3.3 Create Main Layout Component
Keep `src/layouts/MainLayout.jsx` and create a parallel Next.js compatible version if needed.

### 3.4 Handle Client Components
- Add `'use client'` directive to components that use hooks or browser APIs
- Firebase hooks need 'use client'

---

## Phase 4: Public Routes Migration (Day 3-4)

### 4.1 Migrate Home Page
- **File**: `src/app/page.tsx`
- Move content from `src/pages/HomePage.jsx`
- Handle layout (Navbar + Footer) in page or root layout

### 4.2 Migrate About Us
- **File**: `src/app/aboutus/page.tsx`
- Simple conversion, no dynamic routing

### 4.3 Migrate Articles
- **File**: `src/app/articles/[type]/page.tsx`
- Uses dynamic segment `[type]`
- Query parameter handling

### 4.4 Migrate Article Details
- **File**: `src/app/articles/[type]/[articleId]/page.tsx`
- Nested dynamic segments
- Data fetching

### 4.5 Migrate Diary Routes
- **File**: `src/app/diary/page.tsx` (list)
- **File**: `src/app/diary/[id]/page.tsx` (details)

---

## Phase 5: Dashboard & Authentication (Day 5-6)

### 5.1 Update PrivateRoute for Next.js
Create middleware: `src/middleware.ts`
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check authentication
  // Redirect to /login if not authenticated
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};
```

Alternative: Create auth context/provider for client-side auth check.

### 5.2 Create Dashboard Layout
- **File**: `src/app/dashboard/layout.tsx`
- Wrap with DashboardNavbar and authentication check

### 5.3 Migrate Dashboard Pages
- `/dashboard/page.tsx` - Dashboard home
- `/dashboard/overview/page.tsx`
- `/dashboard/articles/*` routes
- `/dashboard/diary/*` routes
- `/dashboard/users/*` routes
- `/dashboard/cta/*` routes

### 5.4 Handle Login
- **File**: `src/app/login/page.tsx`
- Client component for authentication

---

## Phase 6: Components & Hooks (Day 7)

### 6.1 Update Components
- Add `'use client'` to components using hooks
- Update imports for Next.js patterns
- Keep existing components mostly unchanged

### 6.2 Update Hooks
- Ensure hooks work in Next.js environment
- Test client-side rendering

### 6.3 Update Services
- Firebase services should work as-is
- Update environment variable references

---

## Phase 7: Static Assets & Configuration (Day 8)

### 7.1 Handle Assets
- Move favicons and static assets to `public/`
- Update font imports
- Handle image optimization (optional, since using static export)

### 7.2 Update next.config.ts
```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export', // Static export
  distDir: 'build',
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Optional, for Netlify compatibility
}

export default nextConfig
```

### 7.3 PostCSS Config
Create `postcss.config.js` if needed:
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## Phase 8: Testing & Cleanup (Day 9-10)

### 8.1 Test Routes
- [ ] Home page loads correctly
- [ ] Articles listing works
- [ ] Article detail pages work
- [ ] Diary routes work
- [ ] Dashboard authentication works
- [ ] All dashboard pages accessible

### 8.2 Build Test
```bash
npm run build
# Test the build directory
```

### 8.3 Netlify Deployment Test
- Ensure `_redirects` file works with Next.js
- Test client-side routing
- Test static files serving

### 8.4 Cleanup
- [ ] Remove unused CRA files
- [ ] Remove `src/index.jsx` and `src/App.jsx` (if not needed)
- [ ] Remove `react-scripts` from dependencies
- [ ] Update README with Next.js instructions

---

## Migration Order (Recommended)

### Week 1: Foundation
1. ✅ Day 1: Setup dependencies, configs, folder structure
2. ✅ Day 2: Create root layout, update Firebase, global styles
3. ✅ Day 3: Migrate public pages (Home, About Us)
4. ✅ Day 4: Migrate articles pages

### Week 2: Features & Dashboard
5. ✅ Day 5: Migrate diary pages, handle layouts
6. ✅ Day 6: Setup authentication, dashboard structure
7. ✅ Day 7: Migrate dashboard routes
8. ✅ Day 8: Update components, handle assets

### Week 3: Testing & Deployment
9. ✅ Day 9: Testing, bug fixes
10. ✅ Day 10: Final build, deployment, cleanup

---

## Common Issues & Solutions

### Issue 1: Client Components vs Server Components
- **Solution**: Add `'use client'` directive at top of files using hooks
- Example: Pages with useState, useEffect, Firebase hooks

### Issue 2: Environment Variables
- **Solution**: Rename `REACT_APP_*` to `NEXT_PUBLIC_*` in `.env`

### Issue 3: Static Export Limitations
- **Solution**: All routes are static, no SSR. API routes won't work.
- Use client-side data fetching with Firebase

### Issue 4: Image Optimization
- **Solution**: Set `images: { unoptimized: true }` in next.config.ts for static export

### Issue 5: Browser Router → File System Router
- **Solution**: Convert all `<Route>` definitions to folder structure in `app/`

---

## Key Differences to Remember

1. **No BrowserRouter**: Next.js uses file-based routing
2. **Client Components**: Mark components using hooks with `'use client'`
3. **Layouts**: Use `layout.tsx` files in directories
4. **Dynamic Routes**: Use `[param]` folder names
5. **Static Export**: No getServerSideProps, use client-side fetching
6. **Environment**: Use `NEXT_PUBLIC_*` prefix

---

## Success Checklist

- [ ] All public pages work
- [ ] All dashboard pages work
- [ ] Authentication works
- [ ] Build completes without errors
- [ ] Static files are generated correctly
- [ ] Deployment to Netlify works
- [ ] No console errors
- [ ] Performance is acceptable

---

## Rollback Plan

If migration fails:
1. Keep `src/App.jsx` and React Router setup
2. Keep CRA scripts in package.json
3. Use feature branch for Next.js migration
4. Can run both in parallel during transition
5. Switch back by changing build script

---

## Next Steps

After completing migration:
1. Optimize images with Next.js Image component
2. Add metadata and SEO improvements
3. Consider loading states and error boundaries
4. Implement ISR (Incremental Static Regeneration) if appropriate
5. Add analytics and monitoring

---

## Resources

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Migrating from CRA to Next.js](https://nextjs.org/docs/app/building-your-application/upgrading/from-pages)

