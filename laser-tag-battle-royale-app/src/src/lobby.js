import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
//import '../css/lobby.css';

//Want to get list of open Lobbies here and then post it
//Maybe use divider from material-ui?
var newlobbylist = []
function hello(lobbylist){
  var i = 0
  for(i = 0; i < lobbylist.length; i++){
    newlobbylist.push(lobbylist[i])
  }
}
function renderlobby(newlobbylist){
  var i = 0;
  for(i = 0; i < newlobbylist.size; i++){
    return(
      <h1>asdf</h1>
    );
  }
}
class Lobby extends React.Component {
  state = {
    username: this.props.username,
    lobby: "",
    test: 0
  }

  getLobbies = () => {
    let form_body = [];
    let URL = "https://us-central1-lasertag-battle-royale.cloudfunctions.net/gameList";
    let other_params = {
      method: "POST",
      headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: form_body
    };

    return fetch(URL, other_params)
    .then(res => {
      if (res.ok){
        let copy = res.clone();
        return copy.json();
      }
    })
    .then( data => {
      return data;
    }).catch(error => {
      console.log(error);
    })
  };
  getLobbyInfo = () => {
    let form_body = [];
    let URL = "https://us-central1-lasertag-battle-royale.cloudfunctions.net/latitudeLongitude";
    let name = "gameID" + "=" + "8DPCPLjCIvvf4ihTaa72";
    form_body.push(name);
    let other_params = {
      method: "POST",
      headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: form_body
    };

    return fetch(URL, other_params)
    .then(res => {
      if (res.ok){
        let copy = res.clone();
        return copy.json();
        }
      }  
    )
    .then( data => {
      console.log(data)
      return data;
    })
            .catch(error =>{
                console.log(error);
            });
  };
  getUserInfo = () => {
    let form_body = [];
    let URL = "https://us-central1-lasertag-battle-royale.cloudfunctions.net/playerInfo";
    let name = "name" + "=" + this.props.username;
    form_body.push(name);
    let other_params = {
      method: "POST",
      headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: form_body
    };

    return fetch(URL, other_params)
    .then(res => {
      if (res.ok){
        let copy = res.clone();
        return copy.json();
        }
      }  
    )
    .then( data => {
      
      return data;
    })
            .catch(error =>{
                console.log(error);
            });
  };
  getList=()=>{
    var lobbylist = []
    var i = 0
    for(i = 0; i < this.state.lobby.length; i++) {
      lobbylist.push(this.state.lobby[i])
    }
    hello(lobbylist);
    this.setState({
      test: 1
    });
    this.forceUpdate();
    return hello(lobbylist)
  }
  renderlobby=()=>{
    var i = 0;
    let listing = []
    for (i = 0; i < this.state.lobby.length ; i ++){
      listing.push(<Grid item xs ={12}><Button  variant="outlined" component = {Link} to={{
        pathname: '/Lobby/Confirm',
        state: {
          gameID: this.state.lobby[i],
          username: this.props.location.state.username,
          gunID: this.props.location.state.gunID,
          vestID: this.props.location.state.vestID
        }}}>{this.state.lobby[i]}</Button> </Grid>)
    }
    return listing;
  }
  componentDidMount(){
    let test = this.getLobbies().then(
      (test)=>{
      test = test;     
      this.setState({
      lobby: test
    });
  });
  }

  render() {
    //let lobby = this.getLobbies();
    //let game_info = this.getLobbyInfo();
    //let player_info = this.getUserInfo();
    //console.log(this.props.gunID);
    return (
      <div className = "root">   
        <Button className="Button" variant="outlined" component = {Link} to="/">Back</Button>
        <h1 className="Title">Lobby</h1>
          <Grid className = "Grid" container spacing={24} justify="space-evenly" alignItems="stretch" spacing={16}>
            <Grid className = "BeginGrid" item xs = {12}>
              <Button className="Button" variant="outlined" component = {Link} to={{
  pathname: '/Lobby/Create',
  state: {
    username: this.props.location.state.username,
    gunID: this.props.location.state.gunID,
    vestID: this.props.location.state.vestID
  }}}>Create Lobby</Button>
            </Grid>
            <Grid item xs = {12}>
              {this.renderlobby()}
            </Grid>
            <Grid item xs = {12} >
                <Button  variant="outlined" onClick={this.getList}>Refresh List</Button>
                </Grid>
          </Grid>
        </div>
    )
  }
}
export default Lobby;