import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {geolocated} from 'react-geolocated';
import {Map, InfoWindow, GoogleApiWrapper,Polygon} from 'google-maps-react';
import {withScriptjs,withGoogleMap,GoogleMap, Marker, Circle} from "react-google-maps";
import { compose, withProps } from "recompose";

var user = {
  lng: 0,
  lat: 0
};

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=KEY&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `500px`, width: '500px'}} />,
    containerElement: <div style={{ height: `500px`, width: '500px' }} />,
    mapElement: <div style={{ height: `500px`, width: '500px'}} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={13}  defaultCenter={{ lat: user.lat, lng: user.lng }}>
    <Marker position={{ lat: user.lat, lng: user.lng }} />
  </GoogleMap>
));
class WaitingRoom extends React.Component {
  state = {
    longitude: 0,
    latitude: 0
  };
  getLocation = () => {
    this.setState({longitude: this.props.coords && this.props.coords.longitude,
      latitude: this.props.coords && this.props.coords.latitude});

      console.log("HERESR");
  };

  render() {
    //Start should only be visible to the creator of the room.
    return (
      <div>
<<<<<<< HEAD:laser-tag-battle-royale-app/src/waitingroom.js
        
        <h1>WaitingRoom</h1>
        <div>Your location: longitude = 
        {user.lat = this.props.coords && this.props.coords.latitude} latitude = 
    {user.lng = this.props.coords && this.props.coords.longitude}
        <MyMapComponent  />
        </div>
        <Button component = {Link} to="/Lobby/Start">Start</Button>
        <Button component = {Link} to="/Lobby">Back</Button>
=======
        <Button variant="outlined" component = {Link} to="/Lobby">Back</Button>
        <h1>Waiting Room</h1>
        <Button variant="outlined" component = {Link} to="/Lobby/Start">Start</Button>
        
>>>>>>> jkwon045/create-web-app:laser-tag-battle-royale-app/src/src/waitingroom.js
    </div>
    )
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(WaitingRoom);