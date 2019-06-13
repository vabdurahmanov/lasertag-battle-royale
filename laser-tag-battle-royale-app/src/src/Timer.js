
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import sad from './sad.png';
import Button from '@material-ui/core/Button';
import smile from './winner.jpg';


class Timer extends React.Component {
    state = {
    seconds : 10,
    time : 10
  }

  componentDidMount() {
      this.interval = setInterval(() => {
          if (this.state.time > 1){
this.setState({
        time: this.state.time - 1
    })
      } else {
       this.setState({
        time: 10
    })                        
    }
      }, 1000);
  }
  
componentWillUnmount() {
clearInterval(this.interval);
}

  render() {
    return(
      <div>
        <h1>Ring closes in: {this.state.time}s</h1>
      </div>
    );
  }
}


export default Timer;