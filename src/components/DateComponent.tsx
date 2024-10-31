
import React from 'react';
import { useVisitorData } from '../contexts/VisitorDataContext';

const DateComponent: React.FC = () => {
  const { startDate, endDate, setStartDate, setEndDate } = useVisitorData();

  return (
    <div>
      <label>Start Date: </label>
      <input
        type="date"
        value={startDate ? startDate.toISOString().slice(0, 10) : ''}
        onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
      />
      <label>End Date: </label>
      <input
        type="date"
        value={endDate ? endDate.toISOString().slice(0, 10) : ''}
        onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
      />
    </div>
  );
};

export default DateComponent;
