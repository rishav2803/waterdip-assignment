import React from "react"
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useVisitorData } from '../contexts/VisitorDataContext';


interface CountryVisitorCount {
  [key: string]: number;
}

const ColumnChart = () => {
  const [chartData, setChartData] = useState<{ countries: string[]; counts: number[] }>({
    countries: [],
    counts: [],
  });

  const { visitorData, filteredData } = useVisitorData();

  const activeData = filteredData.length > 0 ? filteredData : visitorData;

  useEffect(() => {
    const countryVisitorCount: CountryVisitorCount = activeData.reduce((acc, curr) => {
      const country = curr.country;
      const totalVisitors = parseInt(curr.adults) + parseInt(curr.children) + parseInt(curr.babies);

      acc[country] = (acc[country] || 0) + totalVisitors;
      return acc;
    }, {} as CountryVisitorCount);

    const countries = Object.keys(countryVisitorCount);
    const counts = Object.values(countryVisitorCount);

    setChartData({ countries, counts });
  }, [activeData]);

  const chartOptions = {
    chart: {
      type: 'bar' as const,
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top',
        },
      }
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
    xaxis: {
      categories: chartData.countries,
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      title: {
        text: 'Country',
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: true,
      }
    },
    yaxis: {
      min: 0,
      max: 2000,
      tickAmount: 8,
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      title: {
        text: 'Number of Visitors',
      },
    },
    title: {
      text: 'Number of Visitors per Country',
      align: 'center' as const,
    },
  };

  return (
    <div style={{ width: "90%", marginInline: "auto" }}>
      <Chart
        options={chartOptions}
        data-testid="apexchart"
        series={[{ name: 'Visitors', data: chartData.counts }]}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default ColumnChart;
