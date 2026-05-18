import type { Metadata } from 'next';
import Hero from '@/components/home/Hero/Hero';
import { createPageMetadata } from '@/lib/helpers/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'RentalCar',
  description:
    'Reliable and budget-friendly car rentals for any journey in Ukraine.',
  path: '/',
  imageAlt: 'Rental car on the road',
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <main className='page-enter'>
      <Hero />
    </main>
  );
}
