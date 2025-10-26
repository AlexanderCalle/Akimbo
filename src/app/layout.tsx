import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import React from 'react';
import PlausibleProvider from 'next-plausible';

export const metadata: Metadata = {
  title: 'Akimbo - magazine',
  description: 'Blog site about the ABC of Art, Books and Culture',
  keywords: 'Blog, Magazine, Akimbo, Art, Books, Reviews, Dairy, Culture',
  authors: [{ name: 'Alexander Callebaut' }],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#5bbad5' },
    ],
  },
  manifest: '/manifest.json',
  themeColor: '#ffffff',
  viewport: 'width=device-width, initial-scale=1',
  other: {
    'msapplication-TileColor': '#da532c',
    'Content-Security-Policy':
      "script-src 'self' 'unsafe-inline' https://analytics.akimbo-mag.com https://cdnjs.cloudflare.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://unpkg.com https://cdn.quilljs.com https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://firebasestorage.googleapis.com https://firebase.googleapis.com https://firestore.googleapis.com https://firebaseinstallations.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://analytics.akimbo-mag.com https://www.google-analytics.com https://analytics.google.com;",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <link
          rel='stylesheet'
          href='https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css'
        />
        <link
          rel='stylesheet'
          href='https://cdn.quilljs.com/1.3.6/quill.snow.css'
        />
      </head>

      <body>
        <PlausibleProvider domain='akimbo-mag.com' customDomain='analytics.akimbo-mag.com'>
          {children}
        </PlausibleProvider>
        <Toaster />
        <Script
          defer
          data-domain='akimbo-mag.com'
          src='https://analytics.akimbo-mag.com/js/script.file-downloads.hash.outbound-links.js'
          strategy='afterInteractive'
        />
      </body>
    </html>
  );
}

