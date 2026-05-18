import { Car } from '@/types/car';
import { Filters } from '@/types/filters';
import { nextServer } from './api';
import { BookingData } from '@/types/bookingData';
import {
  normalizeCarsResponse,
  type CarsQueryParams,
  type RawCarsResponse,
} from '@/lib/api/carsResponse';

export type { CarsQueryParams, CarsResponse } from '@/lib/api/carsResponse';

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
