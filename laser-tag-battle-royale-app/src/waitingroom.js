import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
class WaitingRoom extends React.Component {
  render() {
    //Start should only be visible to the creator of the room.
    return (
      <div>
        <h1>WaitingRoom</h1>
        <Button component = {Link} to="/Lobby/Start">Start</Button>
        <Button component = {Link} to="/Lobby">Back</Button>
    </div>
    )
  }
}

export default WaitingRoom;