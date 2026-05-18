import type { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import CatalogClient from '@/components/catalog/CatalogClient/CatalogClient';
import { getAllCarsServer } from '@/lib/api/serverApi';
import {
  CATALOG_PER_PAGE,
  CATALOG_QUERY_STALE_TIME,
} from '@/lib/constants/catalog';
import { createPageMetadata } from '@/lib/helpers/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Catalog',
  description:
    'Browse rental cars by brand, price, and mileage to find the right car for your trip.',
  path: '/catalog',
  imageAlt: 'RentalCar catalog',
});

export const dynamic = 'force-dynamic';

export default async function CatalogPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['cars', {}, 0],
    staleTime: CATALOG_QUERY_STALE_TIME,
    queryFn: ({ pageParam }) =>
      getAllCarsServer({
        page: pageParam,
        perPage: CATALOG_PER_PAGE,
      }),
    initialPageParam: 1,
  });

  return (
    <main className='page-enter'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CatalogClient />
      </HydrationBoundary>
    </main>
  );
}
