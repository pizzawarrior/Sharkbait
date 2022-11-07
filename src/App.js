import USA_States_by_Incidents_1959_2018 from './Assets/2. USA States by Incidents 1959-2018.png'
import CA_Incidents_by_County from './Assets/5_All CA Incidents by County Percentage.png'
import CA_Species_by_County from './Assets/17. Species and percentages by county.png'
import CA_Northern_Southern_Heatmap from './Assets/13_CA days of shark attacks_4.png'
import "@progress/kendo-theme-material/dist/all.css";
import "./App.css";
import { TileLayout } from "@progress/kendo-react-layout";
import { useState } from "react";
import "./App.css";
import StaticImage from "./components/StaticImage";

//import ActiveJobs from "./components/ActiveJobs";
//import TotalJobViews from "./components/TotalJobViews";
//import MostPopularJob from "./components/MostPopularJob";
//import JobCredits from "./components/JobCredits";

const initialPositions = [
  {
    col: 1,
    colSpan: 2,
    rowSpan: 2,
    //does this work? NOPE :(
    header: false,
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
    //header: "Where are shark encounters occurring in California?",
    body: <StaticImage 
    imageSource ={CA_Incidents_by_County}
    imageAlt = "CA Pie Chart Counties"
    />,
  },

  {
   // header: "Sharktacular",
    body: <StaticImage 
    imageSource ={USA_States_by_Incidents_1959_2018}
    imageAlt = "USA Map of Incidents"
    />,
  },

  {
    body: <StaticImage
    imageSource= {CA_Species_by_County}
    imageAlt = "CA County and Species"
    />,
  },

  {
    body: <StaticImage
    imageSource= {CA_Northern_Southern_Heatmap}
    imageAlt = "CA_Northern_Southern_Heatmap"
    />,
  },

  //{
  //  header: "Total job views",
  //  body: <TotalJobViews />,
  //  },
  //{
  //   header: "Active jobs",
  //   body: <ActiveJobs />,
  // },
  // {
  //   header: "Job Credits",
  //   body: <JobCredits />,
  // },
  // {
  //   header: "Most popular job",
  //   body: <MostPopularJob />,
  // },
];

const handleReposition = e => {
  setPositions(e.value);
  localStorage.setItem("dashboard-positions", JSON.stringify(e.value));
};

 return (
    <div className="App">
      {/* <h1>Jobs dashboard</h1> */}
      <TileLayout
        className="tileLayout"
        columns={4}
        rowHeight={255}
        positions={positions}
        gap={{ rows: 10, columns: 10 }}
        items={widgets}
        onReposition={handleReposition}
      />
    </div>
 );
}

export default App;