import CarCard from '@/components/CarCard/CarCard';
import type { Car } from '@/types/car';

type CarsGridProps = {
  cars: Car[];
};

export default function CarsGrid({ cars }: CarsGridProps) {
  return (
    <ul className='grid grid-cols-4 gap-x-[48px] gap-y-[32px]'>
      {cars.map((car) => (
        <li className='h-full' key={car.id}>
          <CarCard car={car} />
        </li>
      ))}
    </ul>
  );
}
