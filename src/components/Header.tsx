
import DateComponent from "../components/DateComponent";
import CsvToJsonConverter from "../components/CsvToJsonConverter";

function Header() {


  return (
    <div style={{
      display: "flex",
    }}>
      <DateComponent />
      {/*<CsvToJsonConverter/>*/}
    </div>
  )
}

export default Header
