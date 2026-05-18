import axios from 'axios';
import type { CarsQueryParams, CarsResponse } from '@/types/carsResponse';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export const getAllCarsServer = async (
  params?: CarsQueryParams,
): Promise<CarsResponse> => {
  const { data } = await api.get<CarsResponse>('/cars', { params });

  return data;
};
