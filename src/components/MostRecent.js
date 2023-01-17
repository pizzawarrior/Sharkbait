import React, { useEffect, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import isEqual from 'lodash/isEqual';
import Geocode from "react-geocode";


const Map = ({
  children, 
  incidents,
  style,
  ...options
}) => {
    const ref = React.useRef(null);
    const [map, setMap] = React.useState();
    const [Geocoder, setGeocoder] = React.useState();

    React.useEffect( () => {
    if (!Geocoder) {
    setGeocoder(new window.google.maps.Geocoder());
    }
  }, 
    [Geocoder]);

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
      }
    }, 
    [ref, map]);

  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]
  );

  return (
    <>
      <div ref={ref} style={style} />
      {incidents.map (incident => {
        console.log(incident)
          Geocoder.geocode( { 'address': incident.location + " " + incident.area}, function(results, status) {
            if (status === 'OK') {

              var marker = new window.google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location
              });
            } else {
              alert('Geocode was not successful for the following reason: ' + status);
            }
          });
            // return React.cloneElement(<Marker key = {incident._id} 
            //   position= {{lat: 37.6,lng: -120.55}}/>, { map })
      })
     }

      {/* {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })} */}
    </>
  );
};

const Marker = (options) => {
  const [marker, setMarker] = React.useState();

  React.useEffect(() => {
    if (!marker) {
      //Note use of window here: react specific
      setMarker(new window.google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);
  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);
  return null;
};

function useDeepCompareMemoize(value) {
  const ref = React.useRef();
    if (!isEqual(value, ref.current)) {
    // if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }
    return ref.current;
}

function useDeepCompareEffectForMaps(
  callback,
  dependencies
) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

const MostRecent = ({imageSource, imageAlt}) => {
  const render = (status) => {
    return 
    <h1>
      {status}
      </h1>;
    };

  const [mostRecent, setMostRecent] = useState([
  ])

  //Wouldn't this be at odds with the Loader call at the very top?
  const [center, setCenter] = React.useState({
    lat: 37.6,
    lng: -120.55,
  });

   useEffect(() => {
    fetch('/MostRecent', {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((incidents) => {
          const incidentToGeocode = 
           {location : incidents[9].location, area: incidents[9].area}
          console.log(incidentToGeocode.location, incidentToGeocode.area)
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
      <Wrapper 
        apiKey={"AIzaSyB77xmgBI6lV247VJB2zXlO5tNVLktE_lU"} 
        libraries={["places"]}
        render={render}>
            <div 
                className = "MostRecent" > {
                //JSON.stringify(mostRecent)
            }
            </div>
            <Map
          center={center}
          //can change in future so it's not just pullihg in one incident:
          incidents = {mostRecent.length ? [mostRecent[8]]: []}
          // onClick={onClick}
          // onIdle={onIdle}
          zoom={5.5}
          style={{ flexGrow: "1", height: "100%" }}
            >
          </Map>
      </Wrapper>
    );  
  };

//TO DO:
//Create a Google.js file inside of a Lib folder (same level as components) later, add all the google mapping code 

export default MostRecent