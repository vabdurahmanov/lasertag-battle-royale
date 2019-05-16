import React from 'react';
import { Link } from 'react-router-dom';
import '../css/App.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class App extends React.Component {
  render(){
    return (
      <div className="MainMenu">
        <h1 className ="App-Title">Main</h1>
        <Grid className = "Grid" container spacing={24} justify="space-evenly" alignItems="stretch" spacing={16}>
          <Grid item xs={12}>
            <Button variant="outlined" component = {Link} to="/Lobby">Look for Lobby</Button>
          </Grid>
        </Grid>
      </div>
   );
  }
}

export default App;
