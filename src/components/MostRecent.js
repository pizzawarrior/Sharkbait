import React, { useEffect, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import isEqual from 'lodash/isEqual';
//Does this help????
import GoogleMapReact from 'google-map-react';

const Map = ({
  //onClick,
  //onIdle,
  children,
  style,
  ...options
}) => {
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();

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

  const service = new window.google.maps.places.PlacesService(map)
  service.findPlaceFromQuery ("Salmon Creek", (first, second)=> {
    console.log(first)
    console.log(second)
  }
  )


  //React.useEffect(() => {
    //if (map) {
      //["click", "idle"].forEach((eventName) =>
        //google.maps.event.clearListeners(map, eventName)
      //);

      //if (onClick) {
        //map.addListener("click", onClick);
      //}

      //if (onIdle) {
        //map.addListener("idle", () => onIdle(map));
      //}
    //}
  //}, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
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

// const deepCompareEqualsForMaps = createCustomEqual(
//   (deepEqual) => (a: any, b: any) => {
//     if (
//       isLatLngLiteral(a) ||
//       a instanceof google.maps.LatLng ||
//       isLatLngLiteral(b) ||
//       b instanceof google.maps.LatLng
//     ) {
//       return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
//     }

//     // TODO: extend to other types

//     // use fast-equals for other objects
//     return deepEqual(a, b);
//   }
// );

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
          // onClick={onClick}
          // onIdle={onIdle}
          zoom={5.5}
          style={{ flexGrow: "1", height: "100%" }}
            >
            <Marker position={{ lat: 37.6,lng: -120.55}}
            />
          </Map>
      </Wrapper>
      );  
    };

//TO DO:
//Create a Google.js file inside of a Lib folder (same level as components) later, add all the google mapping code 


export default MostRecent