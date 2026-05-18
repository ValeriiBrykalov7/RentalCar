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
  totalCars?: number;
  totalPages?: number;
};

export type RawCarsResponse =
  | Car[]
  | {
      cars?: Car[];
      data?: Car[];
      page?: number;
      perPage?: number;
      totalCars?: number;
      totalPages?: number;
    };

export const normalizeCarsResponse = (
  data: RawCarsResponse,
  params?: CarsQueryParams,
): CarsResponse => {
  if (Array.isArray(data)) {
    return {
      cars: data,
      page: params?.page ?? 1,
      perPage: params?.perPage ?? data.length,
    };
  }

  const cars = data.cars ?? data.data ?? [];

  return {
    cars,
    page: data.page ?? params?.page ?? 1,
    perPage: data.perPage ?? params?.perPage ?? cars.length,
    totalCars: data.totalCars,
    totalPages: data.totalPages,
  };
};
