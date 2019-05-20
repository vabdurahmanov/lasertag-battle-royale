import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import {Map, InfoWindow, GoogleApiWrapper,Polygon} from 'google-maps-react';
import {withGoogleMap,GoogleMap, Marker, Circle} from "react-google-maps";
import WaitingRoom from './waitingroom';
import { string } from 'prop-types';


class CreateRoom extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        lobby_name:"",
        num_players: 1,
        lat: 33.98,
        lng: -117.4,
        zoom: 12,
        radius:1000,
        hasClicked: false
    }
  }
    handleChange = (event) => {
        this.setState({num_players : event.target.value});
    }
  mapClick = (event) =>{
    this.setState({
      lat:event.latLng.lat(),
      lng:event.latLng.lng()
    })
  };
   handleRadiusChange = (event) => {
    this.setState({ radius: event.target.value });
  };



    createLobby(){
        console.log("Attempting to create room");
        //Change this later to read the lobby name of a certain clicked lobby
        const lobby_name = "1";
        //Get Username, vest_id, gun_id, location if user is creating lobby
        const URL = "https://us-central1-lasertag-battle-royale.cloudfunctions.net/initalizeGame"
        let form_body = [];
      
        let userID = "userID" + "=" + "Jasmine"; //Replace Name with actual userID
        let laserGunID = "laserGunID" + "=" + "1"; //Replace Number with entered laserGunID
        let vestID = "vestID" + "=" + "1"; //Replace Number with entered vestID
        let latitude = "latitude" + "=" + "-33"; //Replace with queried lat & long
        let longitude = "longitude" + "=" + "33";
        let radius = "radius" + "=" + this.radius;
        form_body.push(userID);
        form_body.push(laserGunID);
        form_body.push(vestID);
        form_body.push(latitude);
        form_body.push(longitude);
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
              console.log(data);
            })
            .catch(error =>{
                console.log(error);
            });
      }

      createLobbyEvaluated = () => {
        let prom = this.createLobby();
        prom.then((response) =>{
          console.log(response);
        }).then((data) =>{
          console.log(data);
        }).catch((err) =>{
          console.log(err);
        })
      }

    render(){
      if (this.state.hasClicked === false) {
            const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap onClick={this.mapClick}
        defaultCenter = { { lat: this.state.lat, lng: this.state.lng } }
        defaultZoom = { 13 }
      ><Circle defaultCenter={{ lat: this.state.lat, lng: this.state.lng }}
                radius ={this.state.radius}>
                </Circle>
      </GoogleMap>
   ));
        return (
            <div>
                <h1>Create Lobby</h1>
                <TextField id="lobby-name" label="Lobby Name"></TextField>
                <form autoComplete="off">
                    <FormControl>

                        <Select id = "num-players"
                            onChange={this.handleChange}
                            value = {this.state.num_players}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value = "1">1</MenuItem>
                            <MenuItem value = "2">2</MenuItem>
                            <MenuItem value = "3">3</MenuItem>
                            <MenuItem value = "4">4</MenuItem>
                            <MenuItem value = "5">5</MenuItem>
                            <MenuItem value = "6">6</MenuItem>
                        </Select>
                    </FormControl>
                </form>
                <GoogleMapExample
          containerElement={ <div style={{ height: `500px`, width: '500px' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        >
        
        </GoogleMapExample>
        <FormControl>
                  <Select
            value={this.state.radius}
            onChange={this.handleRadiusChange}
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

                <Button className="create-room-button" variant="outlined" component={Link} to="/lobby/waiting" onClick={this.createLobbyEvaluated}>Create Lobby</Button>
                <Button variant="outlined" component={Link} to="/lobby">Back</Button>
            </div>
        );
      } else {
        return(
        <WaitingRoom latitude={this.state.lat} longitude={this.state.lng} radius={this.state.radius}/>
        );
      }
    }

}

async function getResponseBody(res){
  let cry = await res;
  return cry;
}

export default GoogleApiWrapper({
  apiKey: ("")
})(CreateRoom)
