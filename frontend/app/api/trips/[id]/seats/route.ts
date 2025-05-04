import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const apiUrl = new URL(`/api/trips/${params.id}/seats`, 'http://localhost:8080');
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch seats');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching seats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch seats' },
      { status: 500 }
    );
  }
} 