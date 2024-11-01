import React from "react";
import { render, screen } from '@testing-library/react';
import { useVisitorData } from '../../contexts/VisitorDataContext';
import TimeSeriesChart from '../TimeSeriesChart';

import '@testing-library/jest-dom';

jest.mock('../../contexts/VisitorDataContext');

describe('TimeSeriesChart', () => {
  beforeEach(async () => {

    Object.defineProperty(window, 'ResizeObserver', {
      writable: true,
      value:
        window.ResizeObserver ||
        jest.fn().mockImplementation(() => ({
          observe: jest.fn(),
          unobserve: jest.fn(),
          disconnect: jest.fn(),
        })),
    });

    Object.defineProperty(global.SVGElement.prototype, 'getScreenCTM', {
      writable: true,
      value: jest.fn(),
    });

    Object.defineProperty(global.SVGElement.prototype, 'createSVGMatrix', {
      writable: true,
      value: jest.fn().mockReturnValue({
        x: 10,
        y: 10,
        inverse: () => { },
        multiply: () => { },
      }),
    });

    jest.clearAllMocks();
  });

  it('renders without crashing when visitorData is empty', () => {
    (useVisitorData as jest.Mock).mockReturnValue({
      visitorData: [],
      filteredData: [],
    });

    render(<TimeSeriesChart />);

    const chartContainer = screen.getByTestId('apexchart');
    expect(chartContainer).toBeInTheDocument();
  });

  it('renders visitors data correctly', () => {
    const mockVisitorData = [
      {
        hotel: 'Hotel A',
        arrival_date_year: 2024,
        arrival_date_month: 'January',
        arrival_date_day_of_month: 1,
        adults: '2',
        children: '1',
        babies: '0',
        country: 'USA',
      },
      {
        hotel: 'Hotel B',
        arrival_date_year: 2024,
        arrival_date_month: 'January',
        arrival_date_day_of_month: 2,
        adults: '1',
        children: '2',
        babies: '1',
        country: 'Canada',
      },
    ];

    (useVisitorData as jest.Mock).mockReturnValue({
      visitorData: mockVisitorData,
      filteredData: [],
    });

    render(<TimeSeriesChart />);

    const chartContainer = screen.getByTestId('apexchart');
    expect(chartContainer).toBeInTheDocument();
  });

});

