// Modulo 21 - Dashboard  - instalando o redux e preparando as pastas.

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';


/* 
 Modulo 21 - Dashboard - instalando o redux e preparando as pastas.
 instalando o sistema de rotas  e criando  o primeiro container  e componente.
*/

import { HashRouter as Router, Route } from 'react-router-dom';

import Pedidos from './containers/Pedidos';


class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="App">
						<Route path={"/"} exact component={Pedidos} />

					</div>
				</Router>
			</Provider>
		);
	} 
}

export default App;
