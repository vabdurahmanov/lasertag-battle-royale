import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';
import Lobby from './src/lobby';
import Game from './src/game';
import WaitingRoom from './src/waitingroom';
import CreateRoom from './src/createroom';
import Confirm from './src/Confirm';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

const routing = (
	<Router>
			<Route exact path="/" component={App} />
			<Route exact path="/Lobby" component={Lobby} />
			<Route path="/Lobby/Create" component={CreateRoom}/>
			<Route path = "/Lobby/Waiting" component={WaitingRoom}/>
			<Route path ="/Lobby/Start" component={Game}/>
			<Route path = "/Lobby/Confirm" component={Confirm}/>
		
	</Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
