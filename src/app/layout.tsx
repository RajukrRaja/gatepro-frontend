import { ReactNode } from 'react';
import Layout from '../components/Layout';
import './globals.css'; // Import the CSS file

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}