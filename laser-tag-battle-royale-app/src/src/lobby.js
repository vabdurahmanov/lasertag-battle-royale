import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
//import '../css/lobby.css';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  Margin:{
    height:140,
    width:100,
  },
  Button: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

//Want to get list of open Lobbies here and then post it
//Maybe use divider from material-ui?
class Lobby extends React.Component {
  state = {
    username: this.props.username //Note for jasmine: This now holds the username
  }

  getUserInfoInit = () => {
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

  getUserInfo = () => {
    let prom = this.getUserInfoInit();

    prom.then(res => {
      console.log("Res2: " + res);
    }) .then ( data => {
      console.log("Data2: " + data);
    }). catch ( error => {
      console.log(error);
    })
  };


  render() {
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