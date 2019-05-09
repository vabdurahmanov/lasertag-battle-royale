import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Button from '@material-ui/core/Button';

class App extends React.Component {
  render(){
    return (
      <div className ="MainMenu">
        <h1 className="Title">Main</h1>
        <Button variant="outlined" component = {Link}  to="/Lobby">Look for Lobby</Button>
      </div>
   );
  }
}

export default App;
