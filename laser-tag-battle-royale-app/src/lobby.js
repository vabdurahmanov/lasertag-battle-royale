import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import './lobby.css';
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
  render() {
    return (
      <div className = "root">   
        <h1 style={{textAlign:'center'}}>Lobby</h1>
        <Grid id = "help" container spacing={24} alignItems="center">
          <Paper style={{margin:'30px',width:'250px', textAlign:'center'}}>
            <Button className="Button" component = {Link} to="Lobby/Create">Create Lobby</Button>
          </Paper>
          <Grid item xs = {12} sm = {6}>
            <Paper style={{width:'250px', textAlign:'center'}}>
              <Button className="Button" component = {Link} to="Lobby/Waiting">Join Lobby</Button>
            </Paper>
          </Grid>
          <Grid item xs = {12} sm = {6}>
            <Button id="back_main" component = {Link} to="/">Back</Button>
          </Grid>
        </Grid>
        </div>
    )
  }
}
export default Lobby;