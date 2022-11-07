
const StaticImage = ({imageSource, imageAlt}) => {
return (
        <div 
            className = "StaticImage" >
            {/* <span className="activeJobsNum">5</span> */}
            <img src={imageSource} alt= {imageAlt} />
        </div>
    );  
};

export default StaticImage