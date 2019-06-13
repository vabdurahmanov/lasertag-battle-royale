import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import sad from './sad.png';
import Button from '@material-ui/core/Button';
import smile from './winner.jpg';


class Info extends React.Component {
 state = {
    eliminated: false,
    username: this.props.username,
    gameID: this.props.gameID,
    userstate: {
      ammo: "Loading..."
    },
    win: false,
    
 }
getUserInfo = () => {
    let form_body = [];
    let URL = "https://us-central1-lasertag-battle-royale.cloudfunctions.net/playerInfo";
    //let name = "name" + "=" + this.props.location.state.username;
    let name = "name" + "=" + this.state.username;
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
gameInfo = () => {
    let form_body = [];
    let URL = "https://us-central1-lasertag-battle-royale.cloudfunctions.net/playerCount";
    //let name = "name" + "=" + this.props.location.state.username;
    let name = "gameID" + "=" + this.state.gameID;
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


elimPlayer = () => {
    let form_body = [];
    let URL = "https://us-central1-lasertag-battle-royale.cloudfunctions.net/deletePlayer";
    let name = "name" + "=" + this.props.username;
    let gameID = "gameID" + "=" + this.props.gameID;
    form_body.push(name);
    form_body.push(gameID);
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
  componentDidMount(props) {
 //6 seconds
       this.interval = setInterval(() => {
   if(this.state.eliminated === false){
             let test = this.getUserInfo().then(
      (test)=>{
      test = test;
      if(typeof(test) != 'undefined'){
      this.setState({
      userstate: test
    });
      } else {
       this.setState({
      userstate: {
          health: "Loading...",
          ammo: "Loading..."
      }
    });   
      }
  });
    let winner = this.gameInfo().then(
      (winner)=>{
      winner = winner;
      if(typeof(winner) != 'undefined'){
      this.setState({
      win: test
    });
      } else {
       this.setState({
      userstate: {
          health: "Loading...",
          ammo: "Loading..."
      }
    });   
      }
  });
   }
    if(this.state.userstate.health <= 0){
          this.setState({
              eliminated: true
          })
        this.elimPlayer()
      }
}, 1000);

  }


componentWillUnmount() {
clearInterval(this.interval);
}

    render(){
        if(this.state.eliminated === false){
        return(
            <div>
            <div><h2>Name: {this.props.username}</h2></div>
            <div><h2>Health: {this.state.userstate.health}</h2></div>
            <div><h2>Ammo: {this.state.userstate.ammo}</h2></div>
            {console.log("hi")}
            </div>
        );
        } else if (this.state.eliminated === true) {
            return(
            <div>
                <div>
                <h1>You have been eliminated</h1>
            </div>
            <div>
                <img src={sad}/>
            </div>
            <div>
                <Button variant="outlined" component = {Link} to="/">Back to Start</Button>
            </div>  
            </div>
                );
        } else if (this.state.win === true){
                        return(
            <div>
                <div>
                <h1>Winner Winner!</h1>
            </div>
            <div>
                <img src={smile}/>
            </div>
            <div>
                <Button variant="outlined" component = {Link} to="/">Back to Start</Button>
            </div>  
            </div>
                );
        }
    }   
}


export default Info;