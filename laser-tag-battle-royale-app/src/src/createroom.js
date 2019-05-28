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


class CreateRoom extends React.Component {
    state = {
        lobby_name:"",
        num_players: 1,
        lat: 33.98,
        lng: -117.4,
        zoom: 12,
        radius:1000,
        hasClicked: false,
        test: this.props.testvalue

    }

    handleChange = (event)=>{
        this.setState({num_players: event.target.value });
    }
  mapClick = (event) =>{
    this.setState({
      lat:event.latLng.lat(),
      lng:event.latLng.lng()
    })
    console.log(this.props.params)
  };
   handleRadiusChange = (event) => {
    this.setState({ radius: event.target.value });
  };

    createLobby=(event)=>{
      this.setState({hasClicked: true});

      };

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
                        <Select id = "num-players" value={this.num_players}
                            onChange={this.handleChange}>
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
            value={this.state.age}
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
        
                <Button className="create-room-button" variant="outlined"  onClick={this.createLobby}>Create Lobby</Button>
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

export default GoogleApiWrapper({
  apiKey: ("")
})(CreateRoom)
