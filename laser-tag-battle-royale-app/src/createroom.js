import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class CreateRoom extends React.Component {
    state = {
        lobby_name:"",
        num_players: null
    }

    handleChange(event){
        this.setState((state, props) =>{ this.state.num_players = event.target.value});
    }

    createLobby(){
        //Change this later to read the lobby name of a certain clicked lobby
        const lobby_name = "1";
        //Get Username, vest_id, gun_id, location if user is creating lobby
        const URL = "https://us-central1-lasertag-battle-royale.cloudfunctions.net/initalizeGame"
        let form_body = [];
      
        let userID = "userID" + "=" + "Name"; //Replace Name with actual userID
        let laserGunID = "laserGunID" + "=" + "1"; //Replace Number with entered laserGunID
        let vestID = "vestID" + "=" + "1"; //Replace Number with entered vestID
        let gameID = "gameID" + "=" + "12345"; //Replace with queried game ID.
        let latitude = "latitude" + "=" + "0"; //Replace with queried lat & long
        let longitude = "longitude" + "=" + "0";
      
        form_body.push(userID);
        form_body.push(laserGunID);
        form_body.push(vestID);
        form_body.push(gameID);
        form_body.push(latitude);
        form_body.push(longitude);
        form_body = form_body.join('&');
      
        let other_params = {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          },
          body: form_body,
          method: "POST"
        };

        try{
            fetch(URL, other_params)
                .then(TypeError => {
                    console.log(TypeError);
                })
                .then( data => {
                    console.log(data);
                })
                .then(res => {
                    console.log(res);
                })
                .then(error =>{
                    console.log(error);
                });
        }
        catch(error){
            console.log(error);
        }
      }

    render(){
        return (
            <div>
                <h1>Create Lobby</h1>
                <TextField id="lobby-name" label="Lobby Name"></TextField>
                <form autoComplete="off">
                    <FormControl>
                        <Select id = "num-players"
                            value={this.state.num_players}
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
                <Button id="create-room-button" component={Link} to="/lobby/waiting" onClick={this.createLobby()}>Create Lobby</Button>
                <Button component={Link} to="/lobby">Back</Button>
            </div>
        );
    }
}

export default CreateRoom;
