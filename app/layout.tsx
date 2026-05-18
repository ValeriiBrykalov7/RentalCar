import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import TanStackProvider from '@/components/providers/TanStackProvider/TanStackProvider';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/layout/Header/Header';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_SIZE,
  SITE_NAME,
  SITE_URL,
} from '@/lib/helpers/metadata';

const manrope = Manrope({
  variable: '--font-family',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  variable: '--second-family',
  subsets: ['latin', 'cyrillic'],
  weight: ['500'],
});

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  applicationName: SITE_NAME,
  title: SITE_NAME,
  description:
    'RentalCar is a car rental web application for browsing cars, filtering the catalog, viewing car details, and sending booking requests.',
  authors: [{ name: 'Valerii Brykalov' }],
  creator: 'Valerii Brykalov',
  publisher: 'Valerii Brykalov',
  keywords: [
    'RentalCar',
    'car rental',
    'rental cars',
    'car catalog',
    'booking request',
  ],
  openGraph: {
    title: SITE_NAME,
    description:
      'Browse rental cars, filter the catalog, view details, and send booking requests with RentalCar.',
    url: '/',
    siteName: SITE_NAME,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        ...DEFAULT_OG_IMAGE_SIZE,
        alt: 'RentalCar hero banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description:
      'Browse rental cars, filter the catalog, view details, and send booking requests with RentalCar.',
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className=' bg-(--bg) [font-family:var(--font-family)]'>
        <TanStackProvider>
          <Header />
          {children}
          <Toaster />
        </TanStackProvider>
      </body>
    </html>
  );
}
