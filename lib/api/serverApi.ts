import axios from 'axios';
import {
  normalizeCarsResponse,
  type CarsQueryParams,
  type CarsResponse,
  type RawCarsResponse,
} from '@/lib/api/carsResponse';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export const getAllCarsServer = async (
  params?: CarsQueryParams,
): Promise<CarsResponse> => {
  const { data } = await api.get<RawCarsResponse>('/cars', { params });

  return normalizeCarsResponse(data, params);
};
