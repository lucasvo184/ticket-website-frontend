export interface Seat {
  id: number;
  seatNumber: string;
  status: "AVAILABLE" | "BOOKED" | "RESERVED";
  bus?: {
    id: number;
    busNumber: string;
  };
} 