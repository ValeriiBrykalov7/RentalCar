import type { Metadata } from 'next';
import CarPageClient from '@/components/car-details/CarPageClient/CarPageClient';
import { createPageMetadata } from '@/lib/helpers/metadata';

type CarPageProps = {
  params: Promise<{
    carId: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: CarPageProps): Promise<Metadata> => {
  const { carId } = await params;

  return createPageMetadata({
    title: 'Car details',
    description:
      'View detailed rental car information, specifications, features, and booking form.',
    path: `/catalog/${carId}`,
    imageAlt: 'RentalCar details page',
  });
};

export default async function CarPage({ params }: CarPageProps) {
  const { carId } = await params;

  return (
    <main className='page-enter'>
      <CarPageClient carId={carId} />
    </main>
  );
}
