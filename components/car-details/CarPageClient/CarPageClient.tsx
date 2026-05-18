'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import BookCarForm from '@/components/car-details/BookCarForm/BookCarForm';
import CarDetails from '@/components/car-details/CarDetails/CarDetails';
import { Loader } from '@/components/shared/Loader/Loader';
import { getCarById } from '@/lib/api/clientApi';

type CarPageClientProps = {
  carId: string;
};

export default function CarPageClient({ carId }: CarPageClientProps) {
  const carQuery = useQuery({
    queryKey: ['car', carId],
    queryFn: () => getCarById(carId),
  });

  return (
    <section className='py-[84px]'>
      <div className='container'>
        {carQuery.isLoading && (
          <div className='page-enter-item flex min-h-[520px] items-center justify-center'>
            <Loader variant='page' />
          </div>
        )}

        {carQuery.isError && (
          <div className='page-enter-item mx-auto flex min-h-[260px] max-w-[520px] flex-col items-center justify-center rounded-2xl bg-(--white) px-[32px] py-[48px] text-center shadow-[0_14px_40px_rgb(16_24_40_/_8%)]'>
            <h1 className='mb-[12px] text-2xl leading-[1.333] font-bold text-(--main)'>
              Car not found
            </h1>
            <p className='text-base leading-[1.5] font-medium text-(--gray)'>
              We could not load this car. Please go back to the catalog and try
              another one.
            </p>
          </div>
        )}

        {carQuery.data && (
          <div className='flex gap-[32px]'>
            <div className='page-enter-item flex w-[640px] flex-col gap-[32px]'>
              <div className='relative h-[512px] w-full overflow-hidden rounded-[16px]'>
                <Image
                  className='object-cover'
                  src={carQuery.data.img}
                  alt={`${carQuery.data.brand} ${carQuery.data.model}, ${carQuery.data.year}`}
                  fill
                  sizes='640px'
                />
              </div>
              <BookCarForm carId={carId} />
            </div>
            <div className='page-enter-item page-enter-item-delay-1'>
              <CarDetails car={carQuery.data} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
