import React from 'react';
import { Link } from 'react-router-dom';
//import '../css/App.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Lobby from './lobby.js';

var username = "";

class App extends React.Component {
    state = {
        username: "",
        gunID: "",
        vestID: "",
        loadPage: false,
        nameInput: false
    };

setName = (event) => {
  if(event.length != 0){
      this.setState({nameInput: true});
  }
};
handleChange = (e) => {
  this.setState({username: e.target.value});
}
handleChangegun = (e) => {
  this.setState({gunID: e.target.value});
}
handleChangevest = (e) => {
  this.setState({vestID: e.target.value});
}
changePage = () => {
    if(this.state.nameInput === true){
        this.setState({loadPage: true})
    }    
}
  
  render(){
      if(this.state.loadPage === false){
    return (
      <div className="MainMenu">
        <h1 className ="App-Title">Main</h1>
        <Grid className = "Grid" container spacing={24} justify="space-evenly" alignItems="stretch" spacing={16}>
        <Grid item xs={12}>
            <TextField
             id="outlined-name"
             label="Name"
             margin="normal"
             values={this.state.value}
             onChange={this.handleChange}
             variant="outlined"
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
             id="outlined-name"
             label="GunID"
             margin="normal"
             values={this.state.value}
             onChange={this.handleChangegun}
             variant="outlined"
            />
        </Grid>
        <Grid item xs={12}>
            <TextField
             id="outlined-name"
             label="VestID"
             margin="normal"
             values={this.state.value}
             onChange={this.handleChangevest}
             variant="outlined"
            />
        </Grid>
        <Grid item xs={12}>
        <Button variant="outlined" onClick={this.setName}>Submit</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" onClick={this.changePage}>Look for Lobby</Button>
          </Grid>
        </Grid>
      </div>
   );
      } else {
          return(
              <Lobby username={this.state.username} gunID={this.state.gunID} vestID={this.state.vestID}/>
          );
      }
  }
}

export default App;
