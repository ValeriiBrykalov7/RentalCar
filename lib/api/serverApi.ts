import axios from 'axios';
import type { Car } from '@/types/car';
import type { CarsQueryParams, CarsResponse } from '@/lib/api/clientApi';

type RawCarsResponse =
  | Car[]
  | {
      cars?: Car[];
      data?: Car[];
      page?: number;
      perPage?: number;
      totalCars?: number;
      totalPages?: number;
    };

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

const normalizeCarsResponse = (
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

export const getAllCarsServer = async (
  params?: CarsQueryParams,
): Promise<CarsResponse> => {
  const { data } = await api.get<RawCarsResponse>('/cars', { params });

  return normalizeCarsResponse(data, params);
};
