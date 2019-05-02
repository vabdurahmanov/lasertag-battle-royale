import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Lobby from './lobby';
import Game from './game';
import WaitingRoom from './waitingroom';
import CreateRoom from './createroom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

const routing = (
	<Router>
		<div>
			<Route exact path="/" component={App} />
			<Route exact path="/lobby" component={Lobby} />
			<Route path="/lobby/create" component={CreateRoom}/>
			<Route path = "/lobby/waiting" component={WaitingRoom}/>
			<Route path ="/lobby/start" component={Game}/>
		</div>
	</Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
