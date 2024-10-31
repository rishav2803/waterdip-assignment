import TimeSeriesChart from "../components/TimeSeriesChart"
import Container from "../components/ui/Container";
import ColumnChart from "../components/ColumnChart";
import SparkLineChartAdult from "../components/SparklineChartAdult";
import SparkLineChartChildren from "../components/SparklineChartChildren";

const Charts = () => {

  return (
    <Container>
      <TimeSeriesChart />
      <ColumnChart />
      <SparkLineChartAdult />
      <SparkLineChartChildren />
    </Container>
  );
};

export default Charts;
