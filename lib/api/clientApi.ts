import { Car } from '@/types/car';
import { Filters } from '@/types/filters';
import { nextServer } from './api';
import { BookingData } from '@/types/bookingData';

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

// All Cars
export const getAllCars = async (params?: CarsQueryParams) => {
  const { data } = await nextServer.get<RawCarsResponse>('/cars', { params });
  return normalizeCarsResponse(data, params);
};

// Car by ID
export const getCarById = async (carId: string) => {
  const { data } = await nextServer.get<Car>(`/cars/${carId}`);
  return data;
};

// Car Filters
export const getCarFilters = async () => {
  const { data } = await nextServer.get<Filters>('/cars/filters');
  return data;
};

// Create Booking Request
export const createBookingRequest = async (
  carId: string,
  bookingData: BookingData,
) => {
  const { data } = await nextServer.post(
    `/cars/${carId}/booking-requests`,
    bookingData,
  );
  return data;
};
