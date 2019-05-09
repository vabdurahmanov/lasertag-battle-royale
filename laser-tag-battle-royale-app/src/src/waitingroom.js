import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
class WaitingRoom extends React.Component {
  render() {
    //Start should only be visible to the creator of the room.
    return (
      <div>
        <Button variant="outlined" component = {Link} to="/Lobby">Back</Button>
        <h1>Waiting Room</h1>
        <Button variant="outlined" component = {Link} to="/Lobby/Start">Start</Button>
        
    </div>
    )
  }
}

export default WaitingRoom;