// import React, { useEffect, useState } from "react";
// import GoogleMapReact from 'google-map-react';
// import { Icon } from '@iconify/react'
// import locationIcon from '@iconify/icons-mdi/map-marker'
// //import './App.css'


// const location = {
//     address: '1600 Amphitheatre Parkway, Mountain View, california.',
//     lat: 37.42216,
//     lng: -122.08427,
//   }

//   const zoomLevel=5.5

// //   const Map = ({ location, zoomLevel }) => (
//   const Map = () => (
//     <div className="map">
//       <h2 className="map-h2">Watch out for the man in the grey suit</h2>
  
//       <div className="google-map">
//         <GoogleMapReact
//           bootstrapURLKeys={{ key: 'AIzaSyB77xmgBI6lV247VJB2zXlO5tNVLktE_lU' }}
//           defaultCenter={location}
//           defaultZoom={zoomLevel}
//         >
//           <LocationPin
//             lat={location.lat}
//             lng={location.lng}
//             text={location.address}
//           />
//         </GoogleMapReact>
//       </div>
//     </div>
//   )

//   const LocationPin = ({ text }) => (
//     <div className="pin">
//       <Icon icon={locationIcon} className="pin-icon" />
//       <p className="pin-text">{text}</p>
//     </div>
//   )

  export default Map