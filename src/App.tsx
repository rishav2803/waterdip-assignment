import TimeSeriesChart from "./components/TimeSeriesChart"

function App() {
  const sampleData = [
    {
      hotel: "Resort Hotel",
      arrival_date_year: 2024,
      arrival_date_month: "July",
      arrival_date_day_of_month: 1,
      adults: 2,
      children: 0,
      babies: 0,
      country: "PRT"
    },
    {
      hotel: "Resort Hotel",
      arrival_date_year: 2024,
      arrival_date_month: "July",
      arrival_date_day_of_month: 1,
      adults: 2,
      children: 0,
      babies: 0,
      country: "PRT"
    },
    {
      hotel: "Resort Hotel",
      arrival_date_year: 2024,
      arrival_date_month: "July",
      arrival_date_day_of_month: 1,
      adults: 1,
      children: 0,
      babies: 0,
      country: "GBR"
    },
    {
      hotel: "Resort Hotel",
      arrival_date_year: 2024,
      arrival_date_month: "July",
      arrival_date_day_of_month: 1,
      adults: 1,
      children: 0,
      babies: 0,
      country: "GBR"
    },
    {
      hotel: "Resort Hotel",
      arrival_date_year: 2024,
      arrival_date_month: "July",
      arrival_date_day_of_month: 1,
      adults: 2,
      children: 0,
      babies: 0,
      country: "GBR"
    },
    {
      hotel: "Resort Hotel",
      arrival_date_year: 2024,
      arrival_date_month: "July",
      arrival_date_day_of_month: 1,
      adults: 2,
      children: 0,
      babies: 0,
      country: "GBR"
    },
    {
      hotel: "Resort Hotel",
      arrival_date_year: 2024,
      arrival_date_month: "July",
      arrival_date_day_of_month: 1,
      adults: 2,
      children: 0,
      babies: 0,
      country: "PRT"
    },
    {
      hotel: "Resort Hotel",
      arrival_date_year: 2024,
      arrival_date_month: "July",
      arrival_date_day_of_month: 1,
      adults: 2,
      children: 0,
      babies: 0,
      country: "PRT"
    },
    {
      hotel: "Resort Hotel",
      arrival_date_year: 2024,
      arrival_date_month: "July",
      arrival_date_day_of_month: 1,
      adults: 2,
      children: 0,
      babies: 0,
      country: "PRT"
    },
    {
      hotel: "Resort Hotel",
      arrival_date_year: 2024,
      arrival_date_month: "July",
      arrival_date_day_of_month: 1,
      adults: 2,
      children: 0,
      babies: 0,
      country: "PRT"
    },
    {
      hotel: "Resort Hotel",
      arrival_date_year: 2024,
      arrival_date_month: "July",
      arrival_date_day_of_month: 1,
      adults: 2,
      children: 0,
      babies: 0,
      country: "PRT"
    },
    {
      hotel: "Resort Hotel",
      arrival_date_year: 2024,
      arrival_date_month: "July",
      arrival_date_day_of_month: 1,
      adults: 2,
      children: 0,
      babies: 0,
      country: "PRT"
    },
    {
      hotel: "Resort Hotel",
      arrival_date_year: 2024,
      arrival_date_month: "July",
      arrival_date_day_of_month: 1,
      adults: 2,
      children: 0,
      babies: 0,
      country: "USA"
    },
    {
      hotel: "Resort Hotel",
      arrival_date_year: 2024,
      arrival_date_month: "July",
      arrival_date_day_of_month: 1,
      adults: 2,
      children: 1,
      babies: 0,
      country: "ESP"
    }
  ];

  return (
    <>
      <TimeSeriesChart data={sampleData} />
    </>
  )
}

export default App
