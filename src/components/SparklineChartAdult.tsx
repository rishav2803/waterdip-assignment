
import { useEffect, useRef, useState } from 'react';
import Chart from 'react-apexcharts';
import { useVisitorData } from '../contexts/VisitorDataContext';
import dayjs from 'dayjs';


interface AdultVisitorCountByDate {
  [key: string]: number;
}

const SparkLineChartAdult = () => {
  const [chartData, setChartData] = useState<{ dates: string[]; counts: number[], totalCount: number }>({
    dates: [],
    counts: [],
    totalCount: 0
  });

  const totalCount = useRef(0);

  const { visitorData, filteredData } = useVisitorData();

  function monthToNumber(mon: string) {
    return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1;
  }

  const activeData = filteredData.length > 0 ? filteredData : visitorData;

  useEffect(() => {
    let ctn = 0;
    const adultVisitorCountByDate: AdultVisitorCountByDate = activeData.reduce((acc, entry) => {
      const date = dayjs(
        `${entry.arrival_date_year}-${monthToNumber(entry.arrival_date_month)}-${entry.arrival_date_day_of_month}`
      ).format('YYYY-MM-DD');
      const totalVisitors = parseInt(entry.adults);
      acc[date] = (acc[date] || 0) + totalVisitors;

      ctn += totalVisitors;
      return acc;
    }, {} as AdultVisitorCountByDate);

    const dates = Object.keys(adultVisitorCountByDate);
    const counts = Object.values(adultVisitorCountByDate);

    setChartData({ dates, counts, totalCount: ctn });
  }, [activeData]);

  const chartOptions = {
    chart: {
      type: 'area' as const,
      height: 350,
      sparkline: {
        enabled: true
      }
    },
    stroke: {
      curve: 'straight'
    },
    fill: {
      opacity: 0.3,
    },
    yaxis: {
      min: 0
    },
    title: {
      text: chartData.totalCount,
      offsetX: 0,
      style: {
        fontSize: '24px',
      }
    },
    subtitle: {
      text: 'Total Adult visitors',
      offsetX: 0,
      style: {
        fontSize: '14px',
      }
    }
  };

  return (
    <div style={{ width: "90%", marginInline: "auto" }}>
      <Chart
        options={chartOptions}
        series={[{ name: 'Visitors', data: chartData.counts }]}
        type="area"
        height={350}
      />
    </div>
  );
};

export default SparkLineChartAdult;
