import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-akimbo-light text-akimbo-dark-900">{children}</body>
    </html>
  );
}
