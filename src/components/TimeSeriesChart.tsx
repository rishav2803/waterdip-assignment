import React, { useState, useEffect } from 'react';
import Chart from "react-apexcharts";
import dayjs from 'dayjs';
import { useVisitorData } from '../contexts/VisitorDataContext';

export interface BookingData {
  hotel: string;
  arrival_date_year: number;
  arrival_date_month: string;
  arrival_date_day_of_month: number;
  adults: number;
  children: number;
  babies: number;
  country: string;
}

const TimeSeriesChart = () => {
  const { visitorData, filteredData } = useVisitorData();

  const activeData = filteredData.length > 0 ? filteredData : visitorData;

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

  function monthToNumber(mon: string) {
    return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1;
  }

  useEffect(() => {
    const visitorsPerDay = activeData.reduce((acc, entry) => {
      const date = dayjs(
        `${entry.arrival_date_year}-${monthToNumber(entry.arrival_date_month)}-${entry.arrival_date_day_of_month}`
      ).format('YYYY-MM-DD');
      const totalVisitors: number = parseInt(entry.adults) + parseInt(entry.children) + parseInt(entry.babies);
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
  }, [activeData]);

  return (
    <div style={{ width: "90%", marginInline: "auto" }}>
      <Chart options={chartData.options} series={chartData.series} type="line" height={350} width={"600px"} />
    </div>
  );
};

export default TimeSeriesChart;

