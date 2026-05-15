import { api } from '../../../api';
import { NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../../_utils/utils';

type Props = {
  params: Promise<{ carId: string }>;
};

export async function POST(request: Request, { params }: Props) {
  const body = await request.json();
  const { carId } = await params;
  try {
    const res = await api.post(`/cars/${carId}/booking-requests`, body);

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status },
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
