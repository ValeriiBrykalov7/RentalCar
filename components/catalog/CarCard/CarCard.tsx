import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/shared/Icon/Icon';
import type { Car } from '@/types/car';

type CarCardProps = {
  car: Car;
};

const DividerIcon = () => (
  <Icon
    name='icon-divider'
    width={1}
    height={16}
    className='text-(--gray-light)'
  />
);

const renderMetaItems = (items: string[]) =>
  items.map((item, index) => (
    <span
      className='inline-flex min-w-0 items-center gap-[6px]'
      key={`${item}-${index}`}
    >
      <span className='truncate'>{item}</span>
      {index < items.length - 1 && <DividerIcon />}
    </span>
  ));

export default function CarCard({ car }: CarCardProps) {
  const { city, country } = car.location;

  const carMeta = [
    city,
    country,
    car.rentalCompany,
    car.type,
    `${car.mileage} km`,
  ];

  return (
    <article className='flex h-full w-[276px] flex-col rounded-2xl bg-(--white) p-4'>
      <div className='relative mb-[16px] h-[268px] w-full shrink-0 overflow-hidden rounded-[14px]'>
        <Image
          className='object-cover'
          src={car.img}
          alt={`${car.brand} ${car.model}, ${car.year}`}
          fill
          sizes='244px'
        />
      </div>

      <div className='mb-[8px] flex items-start justify-between gap-[12px]'>
        <h2 className=' text-[16px] leading-tight font-medium text-(--main)'>
          {car.brand} <span className='text-(--light-blue)'>{car.model}</span>,{' '}
          {car.year}
        </h2>
        <p className='shrink-0 text-[16px] leading-tight font-medium text-(--main)'>
          ${car.rentalPrice}
        </p>
      </div>

      <div className='mb-[24px] rounded-lg bg-(--badges) px-[8px] py-[8px] text-xs leading-[1.333] font-normal text-[color:var(--main)]'>
        <p className='flex min-h-[36px] flex-wrap items-center gap-x-[6px] gap-y-[4px] overflow-hidden'>
          {renderMetaItems(carMeta)}
        </p>
      </div>

      <Link
        target='_blank'
        rel='noopener noreferrer'
        className='button mt-auto w-[244px] self-center'
        href={`/catalog/${car.id}`}
      >
        Read more
      </Link>
    </article>
  );
}
