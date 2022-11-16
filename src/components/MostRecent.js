import { useEffect, useState } from "react";


const MostRecent = ({imageSource, imageAlt}) => {


const [mostRecent, setMostRecent] = useState([
])

   useEffect(() => {
    fetch('/MostRecent', {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((incidents) => {
            setMostRecent(incidents)
          //console.log('Success:', incidents);
         })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
 []
)  
    return (
            <div 
                className = "MostRecent" > {
                JSON.stringify(mostRecent)
            }
            </div>
        );  
    };
    




    export default MostRecent