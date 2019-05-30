import React from 'react';
import Lobby from './lobby';
import {geolocated} from 'react-geolocated';
import {withScriptjs,withGoogleMap,GoogleMap, Marker, Circle} from "react-google-maps";
import { compose, withProps } from "recompose";
//import '../css/game.css';
/*global google*/
const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `500px`, width: '500px'}} />,
    containerElement: <div style={{ height: `500px`, width: '500px' }} />,
    mapElement: <div style={{ height: `500px`, width: '500px'}} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={13}  defaultCenter={{ lat: 0, lng: 0}}>
  <Circle defaultCenter={{ lat: 0, lng: 0 }}
                radius ={100}>
                </Circle>
    <Marker position={{ lat: 0, lng: 0 }} />
  </GoogleMap>
));

class Game extends React.Component {
  render() {
    return <div><h1>Game</h1><MyMapComponent  /></div>
  }
}

export default Game;
