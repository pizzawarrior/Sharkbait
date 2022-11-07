
//this is currently not importing into App.js; exists only as historical record of previous file

import USA_States_by_Incidents_1959_2018 from '../Assets/2. USA States by Incidents 1959-2018.png'

const ActiveJobs = props => {
return (
    <div className="activeJobs">
        <div className="activeJobsContainer">
            {/* <span className="activeJobsNum">5</span> */}
            <img src={USA_States_by_Incidents_1959_2018} alt= "USA Incidents"/>
        </div>
    </div>
    );  
};

export default ActiveJobs