
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { BookingData } from '../components/TimeSeriesChart';
import { fetchData } from '../service/fetchData';


interface VisitorDataContextType {
  visitorData: BookingData[];
  filteredData: BookingData[];
  setVisitorData: (data: BookingData[]) => void;
  setFilteredData: (data: BookingData[]) => void;
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
}

const VisitorDataContext = createContext<VisitorDataContextType | undefined>(undefined);

export const useVisitorData = () => {
  const context = useContext(VisitorDataContext);
  if (!context) {
    throw new Error('useVisitorData must be used within a VisitorDataProvider');
  }
  return context;
};

export const VisitorDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [visitorData, setVisitorData] = useState<BookingData[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filteredData, setFilteredData] = useState<BookingData[]>([]);


  useEffect(() => {
    (async () => {
      const d = await fetchData();
      setVisitorData(d);
    })();
  }, []);


  const toUTC = (date: Date) => {
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    return utcDate;
  };

  function monthToNumber(mon: string) {
    return new Date(Date.parse(mon + " 1, 2012")).getMonth() + 1
  }

  useEffect(() => {
    console.log("Changed the date");
    const filterDataByDate = () => {
      if (!startDate || !endDate) {
        console.log("Inside here")
        setFilteredData(visitorData);
        return;
      }
      const filtered = visitorData.filter((entry) => {
        const entryDate = new Date(
          entry.arrival_date_year,
          monthToNumber(entry.arrival_date_month) - 1,
          entry.arrival_date_day_of_month
        );
        const entryDateUTC = toUTC(entryDate);
        const startDateUTC = toUTC(startDate);
        const endDateUTC = toUTC(endDate);
        // console.log("entry date", entryDateUTC);
        // console.log("start date", startDateUTC);
        // console.log("end date", endDateUTC);
        return entryDateUTC >= startDateUTC && entryDateUTC <= endDateUTC;
      });
      setFilteredData(filtered);
      return;
    }
    filterDataByDate();
  }, [visitorData, startDate, endDate]);

  return (
    <VisitorDataContext.Provider value={{ visitorData, setVisitorData, filteredData, setFilteredData, setStartDate, startDate, endDate, setEndDate }
    }>
      {children} </VisitorDataContext.Provider>);
};
