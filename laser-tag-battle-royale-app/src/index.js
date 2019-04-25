import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Lobby from './lobby';
import Game from './game';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

const routing = (
	<Router>
		<div>
			<Route exact path="/" component={App} />
			<Route path="/lobby" component={Lobby} />
			<Route path ="/lobby/start" component={Game}/>
		</div>
	</Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();