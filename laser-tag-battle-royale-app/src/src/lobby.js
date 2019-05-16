import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import '../css/lobby.css';

//Want to get list of open Lobbies here and then post it
//Maybe use divider from material-ui?
class Lobby extends React.Component {
  render() {
    return (
      <div className = "root">   
        <Button className="Button" variant="outlined" component = {Link} to="/">Back</Button>
        <h1 className="Title">Lobby</h1>
          <Grid className = "Grid" container spacing={24} justify="space-evenly" alignItems="stretch" spacing={16}>
            <Grid className = "BeginGrid" item xs = {12} sm = {2}>
              <Button className="Button" variant="outlined" component = {Link} to="Lobby/Create">Create Lobby</Button>
            </Grid>
            <Grid item xs = {12} sm = {2} >
                <Button className="Button" variant="outlined" component = {Link} to="Lobby/Waiting">Join Lobby</Button>
            </Grid>
          </Grid>
        </div>
    )
  }
}
export default Lobby;