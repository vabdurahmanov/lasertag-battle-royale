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


var golng = 0;
var golat = 0;
var radius = 0;
var dist = 1000000;
function setLoc(state){
  golat = state.latitude;
  golng = state.longitude;
  radius = state.radius;
  var radlat1 = Math.PI * user.lat/180;
  var radlat2 = Math.PI * golat/180;
  var theta = user.lng-golng;
  var radtheta = Math.PI * theta/180;
  dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = dist * 180/Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1000
  console.log("This is distance",dist)
  console.log("radius",radius)


}
class WaitingRoom extends React.Component {
  state = {
    longitude: this.props.longitude,
    latitude: this.props.latitude,
    radius: this.props.radius,
    unlock: false
  };
  getLocation = () => {
    this.setState({longitude: this.props.coords && this.props.coords.longitude,
      latitude: this.props.coords && this.props.coords.latitude});
  };
  checkLock = () => {
    if (dist > radius){
      this.setState({unlock: false})
    } else {
      this.setState({unlock: true})
    }
    
  }

  render() {
    //Start should only be visible to the creator of the room.
    const MyMapComponent = compose(
      withProps({
        googleMapURL:
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyAS_wJ4wVzmzW4EPcFp8Wn2V9pstpusy9w&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `500px`, width: '500px'}} />,
        containerElement: <div style={{ height: `500px`, width: '500px' }} />,
        mapElement: <div style={{ height: `500px`, width: '500px'}} />
      }),
      withScriptjs,
      withGoogleMap
    )(props => (
      <GoogleMap defaultZoom={13}  defaultCenter={{ lat: this.props.location.state.latitude, lng: this.props.location.state.longitude }}>
        <Marker position={{ lat: user.lat, lng: user.lng }} />
        <Circle defaultCenter={{ lat: this.props.location.state.latitude, lng: this.props.location.state.longitude}}
                    radius ={radius}>
                    </Circle>
      </GoogleMap>
    ));
    if(this.state.unlock === true){
    return (
      <div>  
        <h1>WaitingRoom</h1>
        <div>Your location: longitude = 
        {user.lat = this.props.coords && this.props.coords.latitude} latitude = 
    {user.lng = this.props.coords && this.props.coords.longitude}
        <MyMapComponent  />
        {setLoc(this.state)}{this.checkLock}
        </div>
        <Button variant="outlined" component = {Link} to={{
        pathname: '/Lobby/Start',
        state: {
          longitude: this.props.location.state.longitude,
          latitude: this.props.location.state.latitude,
          radius: this.props.location.state.radius,
          username: this.props.location.state.username
        }}}>Start</Button>
        <Button variant="outlined" component = {Link} to="/Lobby">Back</Button>
    </div>
    )
    } else {
      return (
        <div>  
          <h1>WaitingRoom</h1>
          <div>Your location: longitude = 
          {user.lat = this.props.coords && this.props.coords.latitude} latitude = 
      {user.lng = this.props.coords && this.props.coords.longitude}
          <MyMapComponent  />
          {setLoc(this.state)}{console.log("LONGy: ",this.props.location.state.longitude)}
          </div>
          <Button variant="outlined" onClick = {this.checkLock}>Check</Button>
          <Button variant="outlined" component = {Link} to="/Lobby">Back</Button>
      </div>
      )
    }
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(WaitingRoom);