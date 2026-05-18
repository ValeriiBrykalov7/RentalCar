import Icon from '@/components/Icon/Icon';
import type { Car } from '@/types/car';

type CarDetailsProps = {
  car: Car;
};

type SpecItem = {
  icon: string;
  label: string;
  value: string | number;
};

const CheckListItem = ({ children }: { children: React.ReactNode }) => (
  <li className='flex items-center gap-[8px] text-base leading-[1.25] font-medium text-(--main)'>
    <Icon name='icon-check-circle' size={16} className='shrink-0' />
    <span>{children}</span>
  </li>
);

const SpecRow = ({ icon, label, value }: SpecItem) => (
  <li className='flex items-center gap-[8px] text-base leading-[1.25] font-medium text-(--main)'>
    <Icon name={icon} size={16} className='shrink-0' />
    <span>
      {label}: {value}
    </span>
  </li>
);

export default function CarDetails({ car }: CarDetailsProps) {
  const specs: SpecItem[] = [
    { icon: 'icon-calendar', label: 'Year', value: car.year },
    { icon: 'icon-car', label: 'Type', value: car.type },
    {
      icon: 'icon-fuel-pump',
      label: 'Fuel Consumption',
      value: car.fuelConsumption,
    },
    { icon: 'icon-gear', label: 'Engine', value: car.engine },
    {
      icon: 'icon-road-horizon',
      label: 'Mileage',
      value: `${car.mileage} km`,
    },
  ];

  return (
    <article className='w-[528px] text-(--main)'>
      <div className='mb-[32px]'>
        <div className='mb-[8px] flex items-baseline gap-[16px]'>
          <h1 className='text-[24px] leading-[1.333] font-bold'>
            {car.brand} {car.model}, {car.year}
          </h1>
          <p className='text-base leading-[1.25] font-medium text-(--gray)'>
            Article: {car.stockNumber}
          </p>
        </div>

        <p className='mb-[16px] flex items-center gap-[4px] text-base leading-[1.25] font-medium'>
          <Icon name='icon-location' size={16} className='shrink-0' />
          {car.location.city}, {car.location.country}
        </p>

        <p className='text-[24px] leading-[1.333] font-bold text-(--light-blue)'>
          ${car.rentalPrice}
        </p>
      </div>

      <p className='mb-[68px] text-base leading-[1.25] font-medium'>
        {car.description}
      </p>

      <section className='border-b border-(--gray-light) pb-[24px]'>
        <h2 className='mb-[20px] text-xl leading-[1.2] font-semibold'>
          Rental Conditions:
        </h2>
        <ul className='flex flex-col gap-[16px]'>
          {car.rentalConditions.map((condition) => (
            <CheckListItem key={condition}>{condition}</CheckListItem>
          ))}
        </ul>
      </section>

      <section className='border-b border-(--gray-light) py-[24px]'>
        <h2 className='mb-[20px] text-xl leading-[1.2] font-semibold'>
          Car Specifications:
        </h2>
        <ul className='flex flex-col gap-[16px]'>
          {specs.map((spec) => (
            <SpecRow key={spec.label} {...spec} />
          ))}
        </ul>
      </section>

      <section className='pt-[24px]'>
        <h2 className='mb-[20px] text-xl leading-[1.2] font-semibold'>
          Features
        </h2>
        <ul className='flex flex-col gap-[16px]'>
          {car.features.map((feature) => (
            <CheckListItem key={feature}>{feature}</CheckListItem>
          ))}
        </ul>
      </section>
    </article>
  );
}
