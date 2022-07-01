// Modulo 21 - Dashboard  - instalando o redux e preparando as pastas.

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';


/* 
 Modulo 21 - Dashboard - instalando o redux e preparando as pastas.
 instalando o sistema de rotas  e criando  o primeiro container  e componente.
*/

import { HashRouter as Router, Route } from 'react-router-dom';

/*
  Modulo 22 - Dashboard criando a base 
  o que é OHC e criando a base dos menus da Dashboard.

*/

import base from './containers/HOC/Base';
import Pedidos from './containers/Pedidos'; 

/* Modulo 23 -  Tela de login  1/2 */

import Login from './containers/Login';
import RecuperarSenha from './containers/RecuperarSenha';
import ResetarSenha from './containers/RecuperarSenha/ResetarSenha';

/* Modulo 23 Detalhes do pedido 1/6 */

import Pedido from './containers/Pedido'

/* Modulo 25  Clientes 1/2 */

import Clientes from './containers/Clientes';
import Cliente from './containers/Cliente'

/*modulo 25  criando estrutura de categorias*/
import Categorias from './containers/Categorias';


/*modulo 25  categoria 1/2 */
import Categoria from './containers/Categoria';

/* Modulo 25 criando pagina de produtos */
import Produtos from './containers/Produtos';


/* teste warley */

import Configuracao from './containers/Configuracao';
import Perfil from './containers/Perfil';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className='App'>
						<Route path={'/'} exact component={base(Pedidos)} />
						<Route path={'/pedido/:id'} component={base(Pedido)} />
						<Route path={'/clientes'} exact component={base(Clientes)} />
						<Route path={'/cliente/:email'} component={base(Cliente)} />
						<Route path={'/categorias'} component={base(Categorias)} />
						<Route path={'/categoria/:id'} component={base(Categoria)} />
						<Route path={'/produtos'} exact component={base(Produtos)} />

						<Route path={'/Login'} exact component={Login} />
						<Route path={'/recuperar-senha'} component={RecuperarSenha} />
						<Route path={'/resetar-senha/:token'} component={ResetarSenha} />

						<Route path={'/configuracoes'} exact component={base(Configuracao)} />
						<Route path={'/perfil'} exact component={base(Perfil)} />
					</div>
				</Router>
			</Provider>
		);
	} 
}

export default App;
