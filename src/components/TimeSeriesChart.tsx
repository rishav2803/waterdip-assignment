import React, { useState, useEffect } from 'react';
import Chart from "react-apexcharts"
import dayjs from 'dayjs';

interface BookingData {
  hotel: string;
  arrival_date_year: number;
  arrival_date_month: string;
  arrival_date_day_of_month: number;
  adults: number;
  children: number;
  babies: number;
  country: string;
}

// Component Props
interface VisitorChartProps {
  data: BookingData[];
}

const TimeSeriesChart: React.FC<VisitorChartProps> = ({ data }) => {
  // State for the date range selection
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // State for the filtered data
  const [filteredData, setFilteredData] = useState<BookingData[]>([]);

  // State for chart options
  const [chartData, setChartData] = useState({
    series: [{ name: 'Visitors', data: [] as { x: string; y: number }[] }],
    options: {
      chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
      },
      xaxis: { type: 'datetime' },
      yaxis: { title: { text: 'Number of Visitors' } },
    },
  });

  // Function to convert month names to numbers
  // const monthToNumber = (month: string) => dayjs().month(month).month() + 1;
  function monthToNumber(mon: string) {
    return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1
  }

  const toUTC = (date: Date) => {
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    return utcDate;
  };

  // Filter data based on date range
  useEffect(() => {
    if (startDate && endDate) {
      console.log(data)
      const filtered = data.filter((entry) => {
        const entryDate = new Date(
          entry.arrival_date_year,
          monthToNumber(entry.arrival_date_month) - 1,
          entry.arrival_date_day_of_month
        );
        const entryDateUTC = toUTC(entryDate);
        const startDateUTC = toUTC(startDate);
        const endDateUTC = toUTC(endDate);
        console.log("entry date", entryDateUTC);
        console.log("start date", startDateUTC);
        console.log("end date", endDateUTC);
        return entryDateUTC >= startDateUTC && entryDateUTC <= endDateUTC;
      });
      console.log(filtered)
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [data, startDate, endDate]);

  // Update chart data based on filtered data
  useEffect(() => {
    const visitorsPerDay = filteredData.reduce((acc, entry) => {
      const date = dayjs(
        `${entry.arrival_date_year}-${monthToNumber(entry.arrival_date_month)}-${entry.arrival_date_day_of_month}`
      ).format('YYYY-MM-DD');
      const totalVisitors = entry.adults + entry.children + entry.babies;
      acc[date] = (acc[date] || 0) + totalVisitors;
      return acc;
    }, {} as Record<string, number>);

    const seriesData = Object.keys(visitorsPerDay).map((date) => ({
      x: date,
      y: visitorsPerDay[date],
    }));

    setChartData((prevData) => ({
      ...prevData,
      series: [{ name: 'Visitors', data: seriesData }],
    }));
  }, [filteredData]);

  return (
    <div>
      <h2>Visitors per Day</h2>

      {/* Date Range Picker */}
      <div>
        <label>Start Date: </label>
        <input
          type="date"
          onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
        />
        <label>End Date: </label>
        <input
          type="date"
          onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
        />
      </div>

      {/* Time Series Chart */}
      <Chart options={chartData.options} series={chartData.series} type="line" height={350} />
    </div>
  );
};

export default TimeSeriesChart;
