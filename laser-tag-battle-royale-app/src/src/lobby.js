import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import '../css/lobby.css';

//Want to get list of open Lobbies here and then post it
//Maybe use divider from material-ui?
class Lobby extends React.Component {
  state = {
    username: this.props.username //Note for jasmine: This now holds the username
  }

  getLobbies = () => {
    let form_body = [];
    let URL = "https://us-central1-lasertag-battle-royale.cloudfunctions.net/gameList";
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
    })
    .then( data => {
      console.log(data);
      return data;
    }).catch(error => {
      console.log(error);
    })
  };
  getUserInfo = () => {
    let form_body = [];
    let URL = "https://us-central1-lasertag-battle-royale.cloudfunctions.net/playerInfo";
    let name = "name" + "=" + this.props.username;
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
      console.log(data);
      return data;
    })
            .catch(error =>{
                console.log(error);
            });
  };


  render() {
    let lobby = this.getLobbies();
    let player_info = this.getUserInfo();
    console.log(player_info);
    return (
      <div className = "root">   
        <Button className="Button" variant="outlined" component = {Link} to="/">Back</Button>
        <h1 className="Title">Lobby</h1>
          <Grid className = "Grid" container spacing={24} justify="space-evenly" alignItems="stretch" spacing={16}>
            <Grid className = "BeginGrid" item xs = {12} sm = {2}>
              <Button className="Button" variant="outlined" component = {Link} to={{
  pathname: '/Lobby/Create',
  state: {
    username: this.props.username
  }}}>Create Lobby</Button>
            </Grid>
            <Grid item xs = {12} sm = {2} >
                <Button className="Button" variant="outlined" component = {Link} to={{
  pathname: '/Lobby/Waiting',
  state: {
    username: this.props.username
  }}}>Join Lobby</Button>
            </Grid>
          </Grid>
        </div>
    )
  }
}
export default Lobby;