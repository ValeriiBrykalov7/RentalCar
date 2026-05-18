'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import CarDetails from '@/components/CarDetails/CarDetails';
import { Loader } from '@/components/Loader/Loader';
import { getCarById } from '@/lib/api/clientApi';

type CarPageProps = {
  params: Promise<{
    carId: string;
  }>;
};

export default function CarPage({ params }: CarPageProps) {
  const { carId } = use(params);

  const carQuery = useQuery({
    queryKey: ['car', carId],
    queryFn: () => getCarById(carId),
  });

  return (
    <main>
      <section>
        <div className='container py-[84px]'>
          {carQuery.isLoading && <Loader variant='page' />}

          {carQuery.isError && (
            <div className='mx-auto flex min-h-[260px] max-w-[520px] flex-col items-center justify-center rounded-2xl bg-(--white) px-[32px] py-[48px] text-center shadow-[0_14px_40px_rgb(16_24_40_/_8%)]'>
              <h1 className='mb-[12px] text-2xl leading-[1.333] font-bold text-(--main)'>
                Car not found
              </h1>
              <p className='text-base leading-[1.5] font-medium text-(--gray)'>
                We could not load this car. Please go back to the catalog and
                try another one.
              </p>
            </div>
          )}

          {carQuery.data && <CarDetails car={carQuery.data} />}
        </div>
      </section>
    </main>
  );
}
