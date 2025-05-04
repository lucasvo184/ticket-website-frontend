import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, { params }: Props) {
  try {
    console.log('Fetching trip details for ID:', params.id);
    
    const apiUrl = new URL(`/api/trips/${params.id}`, 'http://localhost:8080');
    console.log('Calling backend API:', apiUrl.toString());
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend error response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`Failed to fetch trip details: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Successfully fetched trip details:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching trip details:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch trip details' },
      { status: 500 }
    );
  }
} 