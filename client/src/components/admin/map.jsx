import React, {Component} from 'react';
import $ from 'jquery';
const { compose, withProps, withStateHandlers } = require("recompose");
import FaIconPack from 'react-icons/lib/fa';
import MarkerItem from './marker.jsx';
const FaAnchor = require("react-icons/lib/fa/anchor");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} = require("react-google-maps");


const Map = (props)=> {
  const MapStyles = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}];
  // const address = new google.maps.LatLng(Number(props.geolocationInfo.lat),Number(props.geolocationInfo.long));
  // const request = {
  //   location: address,
  //   radius: '500',
  //   type: ['restaurants']
  // };
  //
  // console.log('google');
  // console.log(google);
  // let service = new google.maps.places.PlacesService(<div/>);
  // service.nearbySearch(request, callback);
  // function callback(results, status) {
  //   if (status === google.maps.places.PlacesServiceStatus.OK) {
  //     for (let i = 0; i < results.length; i++) {
  //       let place = results[i];
  //       console.log("PLACE");
  //       console.log(place);
  //       //createMarker(results[i]);
  //     }
  //   }
  // }

  const lat = Number(props.geolocationInfo.lat);
  const lng =Number(props.geolocationInfo.long);

  const arr = [{lat, lng, info: 'user', icon: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Circle-icons-heart.svg/40px-Circle-icons-heart.svg.png',
  }}, {lat:37.7837, lng:-122.4, info: 'resource1', icon: 'http://images.mobilism.org/?dm=VS3EOQPV'},
    {lat:37.7836, lng:-122.5, info: 'resource2', icon: 'http://images.mobilism.org/?dm=VS3EOQPV'}
  ];


  const MapWithAMakredInfoWindow = compose(
    withScriptjs,
    withGoogleMap
  )((props) =>
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat, lng}}
      defaultOptions={{ styles: MapStyles }}
    >
      {arr.map((location, i)=>
        <MarkerItem location={location} key={i} />
      )}

    </GoogleMap>
  );

    return(
      <MapWithAMakredInfoWindow
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
};




export default Map;
