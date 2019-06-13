import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import {geolocated} from 'react-geolocated';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {Map, InfoWindow, GoogleApiWrapper,Polygon} from 'google-maps-react';
import {withGoogleMap,GoogleMap, Marker, Circle} from "react-google-maps";
import App from "./App";
import smile from './sad.png';
import Info from './Info';
import Timer from './Timer';
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
      ammo: 10
    },
    time:10

  };


  setLoc=()=>{
    var radius = this.props.location.state.radius;
    golat = this.props.location.state.latitude; //ring location
    golng = this.props.location.state.longitude;
    radius = this.state.radius;
    var radlat1 = Math.PI * golat/180;
    var radlat2 = Math.PI * this.props.location.state.userLat/180;
    var theta = golng-this.props.location.state.userLng;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
        dist = dist * 1600;
      console.log("DIFFERENCE ", radius - dist)
    if(radius - dist > 0){
      console.log("YOURE IN")
        
    } else {
        this.setState({
            eliminated: true
        })
      console.log("Youre OUT")
    }
    if(this.state.userstate.health != undefined){
        if(this.state.userstate.health <= 0){

          this.setState({
            eliminated: true
          })
        }
    }
    console.log("This is distance",dist)
    console.log("radius",radius)
    console.log("username",this.state.userstate)
    console.log("elin",this.state.elminated)
    console.log("lat ",this.props.location.state.latitude);
    console.log("lng ",this.props.location.state.longitude);
    console.log("user lat ",this.props.location.state.userLat);
    console.log("user lng ",this.props.location.state.userLng);  
  
  
  }
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
      if(typeof(test) != 'undefined'){
      this.setState({
      userstate: test
    });
      } else {
       this.setState({
      userstate: {
          health: "Retrieving Health"
      }
    });   
      }
  });
      this.setLoc(this.state.userLocation)
 //6 seconds

 this.interval = setInterval(() => {
   if(this.state.eliminated === false){
    console.log("Still Running")
    this.setState({
        radius: this.state.radius - 200
    })
    this.setLoc()
   }
}, 10000);
  }

componentWillUnmount() {
clearInterval(this.interval);
}
elimcheck=()=>{
    console.log(this.state.userstate.health)
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
        defaultZoom = { 14 }
      ><Marker position={{ lat: this.state.userLocation.lat, lng: this.state.userLocation.lng }} />
        <Circle defaultCenter={{ lat: this.props.location.state.latitude, lng: this.props.location.state.longitude }}
                radius ={this.state.radius}>
                </Circle>
      </GoogleMap>
   ));
   if(this.state.eliminated === false){
    return(
    <div><h1>In Game!</h1>
        <div>
            <Info username = {this.state.username} gameID={this.props.location.state.gameID} />
        </div>
        <div>
           <Timer />
        </div>
        <GoogleMapExample
containerElement={ <div style={{ height: `500px`, width: '500px' }} /> }
mapElement={ <div style={{ height: `100%` }} /> }
>
</GoogleMapExample>
</div>
    ); 
  } else  {
      return(
        <div>
            <div>
                <h1>YOU'RE OUTSIDE THE RING</h1>
            </div>
            <div>
                <img src={smile}/>
            </div>
            <div>
                <Button variant="outlined" component = {Link} to="/">Back to Start</Button>
            </div>  
        </div>
      );
    }
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBUQwcOqg3-P-gf1sQjTakr5BOqes0TcMw")
})(Game)
