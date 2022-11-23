import * as d3 from 'd3'
import {useEffect} from 'react'


function TopLocations() { 

    useEffect(() => {

        let Locations = [
    {_id: "Huntington Beach, Orange County", count: 7},
    {_id: "San Onofre, San Diego County", count: 5},
    {_id: "La Jolla, San Diego County", count: 5},
    {_id: "Tomales Point, Marin County", count: 4},
    {_id: "Venice Beach, Los Angeles County", count: 4},
    {_id: "Farallon Islands, San Francisco County", count: 4},
    {_id: "Santa Monica, Los Angeles County", count: 4},
    {_id: "San Onofre State Beach, San Diego County", count: 4},
    {_id: "Dillon Beach, Marin County", count: 4},
    {_id: "Franklin Point, San Mateo County", count: 4}
    ]

            d3.select('#pgraphs').selectAll('p').data(Locations).enter().append('p').text(dt => dt._id + ": " + dt.count)
      
      // Bar Chart:
      const getMax = () => { // Calculate the maximum value in the DataSet
        let max = 0
        Locations.forEach((dt) => {
            if(dt.count > max) {max = dt.count}
        })
        return max
      }
   
      // Create each of the bars and then set them all to have the same height(Which is the max value)
      d3.select('#BarChart').selectAll('div').data(Locations) 
      .enter().append('div').classed('bar', true).style('height', `${getMax()}px`)
  
      //Transition the bars into having a height based on their corresponding count value
      d3.select('#BarChart').selectAll('.bar')
      .transition().duration(1000).style('height', bar => `${bar.count}px`)
        .style('width', '80px').style('margin-right', '10px').delay(300) // Fix their width and margin
      
  }, [])

return (
  <div className = "TopLocations">
    {/* //Create a div to house our p tags */}
    <div id="pgraphs"></div> 
    {/* //Create a div to house our BarChart */}
    <div id="BarChart"></div> 
  </div>
);
}

export default TopLocations


