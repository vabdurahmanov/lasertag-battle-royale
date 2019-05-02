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
        <Button component = {Link} to="Lobby/Waiting" onClick = {updateLobby}>Join Lobby</Button>
        <Button component = {Link} to="/">Back</Button>
        </div>
    )
  }
}

//Pass in user info
function updateLobby(){
  //Change this later to read the lobby name of a certain clicked lobby
  const lobby_name = "1";
  //Get Username, vest_id, gun_id, location if user is creating lobby
  const URL = "https://us-central1-lasertag-battle-royale.cloudfunctions.net/initalizeGame"
  let form_body = [];

  let userID = "userID" + "=" + "Name"; //Replace Name with actual userID
  let laserGunID = "laserGunID" + "=" + "1"; //Replace Number with entered laserGunID
  let vestID = "vestID" + "=" + "1"; //Replace Number with entered vestID
  let gameID = "gameID" + "=" + "12345"; //Replace with queried game ID.

  form_body.push(userID);
  form_body.push(laserGunID);
  form_body.push(vestID);
  form_body.push(gameID);
  form_body = form_body.join('&');

  let other_params = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: form_body,
    method: "POST"

  }

  return new Promise((resolve, reject) => {
    fetch(URL, other_params)
      .then( data => {
        console.log(data);
        resolve();
      })
      .then(res => {
        console.log(res);
        resolve();
      })
      .then( error =>{
        console.log(error);
        reject();
      });
  })
}

export default Lobby;