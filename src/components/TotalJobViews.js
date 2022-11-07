

const jobViews = [
    {
    id: 1,
    job: "Hot Chocolate",
    views: 150,
},
{
    id: 2,
    job: "Plate of fish",
    views: 25,
},
{
    id: 3,
    job: "Catfish by day, Mudskipper by night",
    views: 69,
},
{
    id: 4,
    job: "Future butterfly",
    views: 45,
},
];

const TotalJobViews = props => {
    return (
        <div>
            <div className="">
                <ul className="totalJobViewsGrid">
                    {jobViews.map((job) => {
                        return (
                            <li className="jobsViewBlock" key= {job.id}>
                                <span className="jobTitle">{job.job}</span>

                                <div className="jobViewsContainer">
                                <span className="jobViews">{job.views}</span>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    </div>
);
};

export default TotalJobViews;