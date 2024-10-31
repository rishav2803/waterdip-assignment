import CsvToJsonConverter from "./components/CsvToJsonConverter";
import TimeSeriesChart from "./components/TimeSeriesChart"
import Container from "./components/ui/Container";
import ColumnChart from "./components/ColumnChart";
import DateComponent from "./components/DateComponent";
import SparkLineChartAdult from "./components/SparklineChartAdult";

function App() {


  return (
    <>
      <DateComponent />
      <Container>
        <TimeSeriesChart />
        <ColumnChart />
        <SparkLineChartAdult />
        <TimeSeriesChart />
      </Container>
    </>
  )
}

export default App
