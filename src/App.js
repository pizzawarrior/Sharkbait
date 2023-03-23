import USA_States_by_Incidents_1959_2018 from './Assets/2. USA States by Incidents 1959-2018.png'
import "@progress/kendo-theme-material/dist/all.css";
import "./App.css";
import { TileLayout } from "@progress/kendo-react-layout";
import { useState } from "react";
import StaticImage from "./components/StaticImage";
import IncidentForm from "./components/IncidentForm";
import MostRecent from "./components/MostRecent";
import TopLocations from "./components/TopLocations";


const initialPositions = [
  {
    col: 1,
    colSpan: 2,
    rowSpan: 2,
  },
  {
    col: 3,
    colSpan: 2,
    rowSpan: 2,
  },
  {
    col: 1,
    row: 3,
    colSpan: 2,
    rowSpan: 2,
  },
  {
    col: 3,
    row: 3,
    colSpan: 2,
    rowSpan: 2,
  },
];

const getPositions = initialPositions => {
  //Try to get positions from local storage
  //If we have none in storage then default to initial positions
  return (
   // JSON.parse(localStorage.getItem("dashboard-positions")) || 
   initialPositions
  );
};

function App() {
  const [positions, setPositions] = useState(getPositions(initialPositions));

const widgets = [
  
  {
     body: <StaticImage 
     imageSource ={USA_States_by_Incidents_1959_2018}
     imageAlt = "USA Map of Incidents"
     />
   },
  
   {
    header: "Top Incident Locations in California",
    body: <TopLocations/>
},

{
    body: <MostRecent/>
},

  {
    header: "Report A New Incident",
    body: <IncidentForm/>
  }
];

const handleReposition = e => {
  setPositions(e.value);
  localStorage.setItem("dashboard-positions", JSON.stringify(e.value));
};

 return (
    <div className="App">
      <TileLayout
        className="tileLayout"
        columns={4}
        rowHeight={275}
        positions={positions}
        gap={{ rows: 10, columns: 10 }}
        items={widgets}
        onReposition={handleReposition}
      />
    </div>
 );
}

export default App;