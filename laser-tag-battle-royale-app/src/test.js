import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Map, InfoWindow, GoogleApiWrapper,Polygon} from 'google-maps-react';
import {withGoogleMap,GoogleMap, Marker, Circle} from "react-google-maps";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
/*global google*/

var currLoc= {
  lat: 38.98,
  lng: -117.4
};
function handleClick(event) {var lat = event.latLng.lat(), lng = event.latLng.lng();
console.log(lat,lng)};
class Lobby extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      lat: 33.98,
      lng: -117.4,
      zoom: 12,
        radius:1000
    }
  }
  mapClick = (event) =>{ 
    console.log(event.latLng.lat());
    this.setState({
      lat:event.latLng.lat(),
      lng:event.latLng.lng()
    })
  };
   handleChange = (event) => {
    this.setState({ radius: event.target.value });
  };
  render() {
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap onClick={this.mapClick}
        defaultCenter = { { lat: this.state.lat, lng: this.state.lng } }
        defaultZoom = { 13 }
      ><Circle defaultCenter={{ lat: this.state.lat, lng: this.state.lng }}
                radius ={this.state.radius}>
                </Circle>
      </GoogleMap>
   ));
    return( 
      <div>
    <h1>Lobby</h1>
    <GoogleMapExample
          containerElement={ <div style={{ height: `500px`, width: '500px' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        >
        
        </GoogleMapExample>
        <div>
        <FormControl>
                  <Select
            value={this.state.age}
            onChange={this.handleChange}
          >
        
        <InputLabel htmlFor="demo-controlled-open-select">Radius</InputLabel>
            <MenuItem value={250}>250</MenuItem>
            <MenuItem value={500}>500</MenuItem>
            <MenuItem value={750}>750</MenuItem>
            <MenuItem value={1000}>1000</MenuItem>
            <MenuItem value={1500}>2000</MenuItem>
            <MenuItem value={1700}>3000</MenuItem>
          </Select>
        </FormControl>
        </div>
    </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("")
})(Lobby)