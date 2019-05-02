import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

//Want to get list of open Lobbies here and then post it
//Maybe use divider from material-ui?
class Lobby extends React.Component {
  render() {
    return (
      <div>
        <h1>Lobby</h1>
        <Button component = {Link} to="Lobby/Create">Create Lobby</Button>
        <Button component = {Link} to="Lobby/Waiting">Join Lobby</Button>
        <Button component = {Link} to="/">Back</Button>
        </div>
    )
  }
}
export default Lobby;