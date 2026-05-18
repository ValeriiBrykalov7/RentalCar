'use client';

import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import SearchForm from '@/components/SearchForm/SearchForm';
import { getAllCars, type CarsQueryParams } from '@/lib/api/clientApi';
import { Loader } from '@/components/Loader/Loader';
import CarsGrid from '@/components/CarsGrid/CarsGrid';

const PER_PAGE = 12;

export default function CatalogPage() {
  const [filters, setFilters] = useState<CarsQueryParams>({});
  const [searchVersion, setSearchVersion] = useState(0);

  const carsQuery = useInfiniteQuery({
    queryKey: ['cars', filters, searchVersion],
    queryFn: ({ pageParam }) =>
      getAllCars({
        ...filters,
        page: pageParam,
        perPage: PER_PAGE,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.totalPages) {
        return lastPage.page < lastPage.totalPages
          ? lastPage.page + 1
          : undefined;
      }

      return lastPage.cars.length === lastPage.perPage
        ? lastPage.page + 1
        : undefined;
    },
  });

  const cars = carsQuery.data?.pages.flatMap((page) => page.cars) ?? [];
  const isGridLoading =
    carsQuery.isLoading ||
    (carsQuery.isFetching && !carsQuery.isFetchingNextPage);
  const isEmpty = carsQuery.isSuccess && cars.length === 0;
  const shouldShowLoadMore =
    carsQuery.isSuccess &&
    cars.length > 0 &&
    (Boolean(carsQuery.hasNextPage) || carsQuery.isFetchingNextPage) &&
    !isGridLoading;
  const shouldAddGridBottomSpacing =
    carsQuery.isSuccess && cars.length > 0 && !shouldShowLoadMore;

  const handleSearchSubmit = (nextFilters: CarsQueryParams) => {
    setFilters(nextFilters);
    setSearchVersion((version) => version + 1);
  };

  return (
    <main>
      <section>
        <div className='container'>
          <SearchForm onSubmit={handleSearchSubmit} />

          {!isGridLoading && cars.length > 0 && (
            <div className={shouldAddGridBottomSpacing ? 'pb-[124px]' : ''}>
              <CarsGrid cars={cars} />
            </div>
          )}

          {isGridLoading && (
            <div className='flex min-h-[320px] items-center justify-center'>
              <Loader variant='page' />
            </div>
          )}

          {isEmpty && (
            <div className='mx-auto flex min-h-[260px] max-w-[520px] flex-col items-center justify-center rounded-2xl bg-(--white) px-[32px] py-[48px] text-center shadow-[0_14px_40px_rgb(16_24_40_/_8%)]'>
              <h2 className='mb-[12px] text-2xl leading-[1.333] font-bold text-(--main)'>
                No cars found
              </h2>
              <p className='text-base leading-[1.5] font-medium text-(--gray)'>
                Try changing the brand, price, or mileage filters and search
                again.
              </p>
            </div>
          )}

          {shouldShowLoadMore && (
            <div className='flex justify-center py-[60px]'>
              <button
                className='button button-outline w-[156px]'
                type='button'
                onClick={() => carsQuery.fetchNextPage()}
                disabled={
                  !carsQuery.hasNextPage || carsQuery.isFetchingNextPage
                }
              >
                {carsQuery.isFetchingNextPage ? (
                  <Loader variant='button' />
                ) : (
                  'Load more'
                )}
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
