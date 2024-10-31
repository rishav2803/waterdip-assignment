import CsvToJsonConverter from "./components/CsvToJsonConverter";
import TimeSeriesChart from "./components/TimeSeriesChart"
import Container from "./components/ui/Container";
import ColumnChart from "./components/ColumnChart";
import DateComponent from "./components/DateComponent";

function App() {


  return (
    <>
      <DateComponent />
      <CsvToJsonConverter />
      <Container>
        <TimeSeriesChart />
        <ColumnChart />
        <TimeSeriesChart />
        <TimeSeriesChart />
      </Container>
    </>
  )
}

export default App
