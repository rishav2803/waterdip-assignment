import TimeSeriesChart from "./components/TimeSeriesChart"
import Container from "./components/ui/Container";
import ColumnChart from "./components/ColumnChart";
import DateComponent from "./components/DateComponent";
import SparkLineChartAdult from "./components/SparklineChartAdult";
import SparkLineChartChildren from "./components/SparklineChartChildren";

function App() {


  return (
    <>
      <DateComponent />
      <Container>
        <TimeSeriesChart />
        <ColumnChart />
        <SparkLineChartAdult />
        <SparkLineChartChildren />
      </Container>
    </>
  )
}

export default App
