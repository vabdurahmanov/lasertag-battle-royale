import React from 'react';
import { Link } from 'react-router-dom';
//import './App.css';
import Button from '@material-ui/core/Button';

class App extends React.Component {
  render(){
    return (
      <div>
        <h1>Main</h1>
        <Button component = {Link} to="/Lobby">Look for Lobby</Button>
      </div>
   );
  }
}

export default App;
