import type { Metadata } from 'next';

export const SITE_NAME = 'RentalCar';
export const DEFAULT_OG_IMAGE = '/images/hero-banner.jpg';
export const DEFAULT_OG_IMAGE_SIZE = {
  width: 1200,
  height: 630,
};
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : new URL('http://localhost:3000');

type CreatePageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  imageAlt?: string;
  absoluteTitle?: boolean;
};

export const createPageMetadata = ({
  title,
  description,
  path,
  imageAlt = 'RentalCar',
  absoluteTitle = false,
}: CreatePageMetadataOptions): Metadata => {
  const pageTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;

  return {
    metadataBase: SITE_URL,
    title: pageTitle,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: pageTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          ...DEFAULT_OG_IMAGE_SIZE,
          alt: imageAlt,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
};
