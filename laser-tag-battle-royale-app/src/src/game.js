import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {Map, InfoWindow, GoogleApiWrapper,Polygon} from 'google-maps-react';
import {withGoogleMap,GoogleMap, Marker, Circle} from "react-google-maps";
import App from "./App";
//longitude = {user.lat = this.props.coords && this.props.coords.latitude} 
//latitude = {user.lng = this.props.coords && this.props.coords.longitude}
//import '../css/game.css';
/*global google*/
var user = {
  lng: 0,
  lat: 0
};
/*  this.interval = setInterval(() => {
    window.location.reload();

}, 2000);*/
var golng = 0;
var golat = 0;

var dist = 1000000;
class Game extends React.Component {
  state = {
    longitude: this.props.location.state.longitude,
    latitude: this.props.location.state.latitude,
    radius: this.props.location.state.radius,
    userLocation: {
      lat: 0,
      lng: 0
    },
    loading: false,
    eliminated: false,
    username: this.props.location.state.username,
    userstate: {
      ammo: 10,
      health: 1000
    }

  };


  setLoc(){
    var radius = this.props.location.state.radius;
    golat = this.props.location.state.latitude; //ring location
    golng = this.props.location.state.longitude;
    radius = this.state.radius;
    var radlat1 = Math.PI * golat/180;
    var radlat2 = Math.PI * this.state.userLocation.lat/180;
    var theta = golng-this.state.userLocation.lng;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    if(dist - radius < 0){
      console.log("YOURE IN")
    } else {
      console.log("Youre OUT")
    }
    if(this.state.userstate.health === 10){
      this.setState({
        eliminated: true
      })
    }
    console.log("This is distance",dist)
    console.log("radius",radius)
    console.log("username",this.state.userstate)
    console.log("elin",this.state.elminated)
  
  
  }asdf
  getUserInfo = () => {
    let form_body = [];
    let URL = "https://us-central1-lasertag-battle-royale.cloudfunctions.net/playerInfo";
    //let name = "name" + "=" + this.props.location.state.username;
    let name = "name" + "=" + this.props.location.state.username;
    form_body.push(name);
    let other_params = {
      method: "POST",
      headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: form_body
    };

    return fetch(URL, other_params)
    .then(res => {
      if (res.ok){
        let copy = res.clone();
        return copy.json();
        }
      }  
    )
    .then( data => {
      return data;
    })
            .catch(error =>{
                console.log(error);
            });
  };
  componentDidMount(props) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        this.setState({
          userLocation: { lat: latitude, lng: longitude },
          loading: false
        });
      },
      () => {
        this.setState({ loading: false });
      }
    );
    let test = this.getUserInfo().then(
      (test)=>{
      test = test;     
      this.setState({
      userstate: test
    });
  });
 //6 seconds

 this.interval = setInterval(() => {
   if(this.state.eliminated === false){
  window.location.reload();
   }
}, 2000);
  }

componentWillUnmount() {
clearInterval(this.interval);
}
    elimcheck=()=>{
      if(this.state.eliminated === true){
        return(
          <h1>GET OUT</h1>
        );
      }
    }
  render() {
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap onClick={this.mapClick}
        defaultCenter = { { lat: this.props.location.state.latitude, lng: this.props.location.state.longitude } }
        defaultZoom = { 13 }
      ><Marker position={{ lat: this.state.userLocation.lat, lng: this.state.userLocation.lng }} />
        <Circle defaultCenter={{ lat: this.props.location.state.latitude, lng: this.props.location.state.longitude }}
                radius ={this.props.location.state.radius}>
                </Circle>
      </GoogleMap>
   ));
   if(this.state.eliminated === false){
    return(
    <div><h1>Game</h1>Your location: longitude = 
    {user.lat = this.state.userLocation.lat} latitude = 
{user.lng = this.state.userLocation.lng}<GoogleMapExample
containerElement={ <div style={{ height: `500px`, width: '500px' }} /> }
mapElement={ <div style={{ height: `100%` }} /> }
>
</GoogleMapExample>
{this.setLoc()}
</div>
    ); } else  {
      return(
        <div>
      <h1>YOURE OUT</h1>
      <Button variant="outlined" component = {Link} to="/">Back to Start</Button>
        </div>
      );
    }
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDm63v3enBHPjerhfuNHvaoyYXruvGqwq4")
})(Game)
