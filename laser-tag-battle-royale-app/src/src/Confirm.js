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


class Confirm extends React.Component {
   state = {
      longitude: 0,
      latitude: 0,
      radius: 0,
      ID: ""
   }
   componentDidMount(){
      let test = this.getLobbyInfo().then(
        (test)=>{
        test = test;     
        this.setState({
        radius: test.radius,
        latitude: test.latitude,
        longitude: test.longitude
      });
    });

    }
   getLobbyInfo = () => {
      let form_body = [];
      let URL = "https://us-central1-lasertag-battle-royale.cloudfunctions.net/latitudeLongitude";
      let name = "gameID" + "=" + this.props.location.state.gameID;
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
   mapClick = (event) =>{
      console.log(this.state.radius)
    };
    addPlayer=()=>{
      //Change this later to read the lobby name of a certain clicked lobby
      const lobby_name = "1";
      //Get Username, vest_id, gun_id, location if user is creating lobby
      const URL = "https://us-central1-lasertag-battle-royale.cloudfunctions.net/addPlayer"
      let form_body = [];
    
      let userID = "userID" + "=" + String(this.props.location.state.username); //Replace Name with actual userID
      let laserGunID = "laserGunID" + "=" + String(this.props.location.state.gunID); //Replace Number with entered laserGunID
      let vestID = "vestID" + "=" + String(this.props.location.state.vestID);
      let gameID = "gameID" + "=" + String(this.props.location.state.gameID);
      form_body.push(userID);
      form_body.push(laserGunID);
      form_body.push(vestID);
      form_body.push(gameID);
      form_body = form_body.join('&');

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
              return copy.text();
              }
            }  
          )
          .then( data => {
            return data;
          })
          .catch(error =>{
              console.log(error);
          });
    }
   render() {
      //let game_info = this.getLobbyInfo();
      //console.log(game_info)
      const GoogleMapExample = withGoogleMap(props => (
         <GoogleMap onClick={this.mapClick}
           defaultCenter = { { lat: this.state.latitude, lng: this.state.longitude } }
           defaultZoom = { 13 }
         ><Circle defaultCenter={{ lat: this.state.latitude, lng: this.state.longitude }}
                   radius ={this.state.radius}>
                   </Circle>
         </GoogleMap>
      ));
      return(
         <div>
                            <GoogleMapExample
          containerElement={ <div style={{ height: `500px`, width: '500px' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        >
        {console.log(this.state.longitude)}
        {console.log(this.state.latitude)}
        {console.log(this.props.location.state.username)}
        {console.log(this.props.location.state.gunID)}
        </GoogleMapExample>
        <Button onClick={this.addPlayer}>Register</Button>
        <Button className="Button" variant="outlined"  component = {Link} to={{
        pathname: '/Lobby/Waiting',
        state: {
          longitude: this.state.longitude,
          latitude: this.state.latitude,
          radius: this.state.radius,
          username: this.props.location.state.username
        }}}>Join Game!</Button>
        <Button className="Button" variant="outlined" component = {Link} to={{
        pathname: '/Lobby',
        state: {
          gameID: 7
        }}}>Wrong game</Button>
         </div>
      )
   }

}
export default GoogleApiWrapper({
   apiKey: ("AIzaSyAS_wJ4wVzmzW4EPcFp8Wn2V9pstpusy9w")
 })(Confirm)