import type { Car } from '@/types/car';

export type CarsQueryParams = {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
  perPage?: number;
  page?: number;
};

export type CarsResponse = {
  cars: Car[];
  page: number;
  perPage: number;
  totalCars: number;
  totalPages: number;
};
