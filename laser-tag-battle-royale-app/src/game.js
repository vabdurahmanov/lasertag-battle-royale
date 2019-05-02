import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import GoogleMapReact,{Circle} from 'google-map-react';
//import './game.css';
/*global google*/
//var center = this.props.lat
const apiIsLoaded = (map, maps, center) => {
  const circle = new google.maps.Circle({
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.3,
    map,
    center: center,
    radius: 1000
  });
};
const getLoc = (map) =>{
  google.maps.event.addListener(map, "click", function (e) {

  //lat and lng is available in e object
  var latLng = e.latLng;
  console.log(latLng);
});
function handleClick(event) {var lat = event.latLng.lat(), lng = event.latLng.lng()}
};
class Game extends React.Component {
   static defaultProps = {
      center: {
        lat: 0,
        lng: 0
      },
      zoom: 12
    };
  render() {
    return (
    <div>
    <h1>Game</h1>
    <div style={{ height: '50vh', width: '50%' }}>
    <GoogleMapReact
          bootstrapURLKeys={{ key:"AIzaSyC2yEglKuqHR6NfFD8fg2TYM7_lkLlEpI8"}}
          defaultCenter={{lat: 33.98, lng:-117.4}}
          defaultZoom={this.props.zoom}
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps,{lat: 33.98, lng:-117.4})}
        >
          </GoogleMapReact>
    </div>
    </div>
    );
  }
}


export default GoogleApiWrapper({
   apiKey: ("AIzaSyC2yEglKuqHR6NfFD8fg2TYM7_lkLlEpI8")
 })(Game)