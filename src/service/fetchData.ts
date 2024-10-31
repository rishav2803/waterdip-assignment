import { BookingData } from "../components/TimeSeriesChart";

export const fetchData = async (): Promise<BookingData[]> => {
  try {
    const response = await fetch('/data.json');
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const res: BookingData[] = await response.json();
    return res;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return [];
  }
};

