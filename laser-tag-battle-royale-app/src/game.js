import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import GoogleMapReact from 'google-map-react';
//import './game.css';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
class Game extends React.Component {
   static defaultProps = {
      center: {
        lat: 59.95,
        lng: 30.33
      },
      zoom: 11
    };
  render() {
    return (
    <div>
    <h1>Game</h1>
    <div style={{ height: '50vh', width: '50%' }}>
    <GoogleMapReact
          bootstrapURLKeys={{ key:"AIzaSyDbZF5XdDfleAHFu2ThftTRk-F48F_qZMw"}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
        <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
          </GoogleMapReact>
    </div>
    </div>
    );
  }
}


export default GoogleApiWrapper({
   apiKey: ("AIzaSyDbZF5XdDfleAHFu2ThftTRk-F48F_qZMw")
 })(Game)