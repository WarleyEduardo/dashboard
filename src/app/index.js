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

/* Modulo 25 preparando a base de produtos */

import Produto from './containers/Produto'


/* Modulo 25  Avaliações */

import Avaliacoes from './containers/Avaliacoes'
import Avaliacao from './containers/Avaliacao'

/* Modulo 25 configurações  */
import Configuracoes from './containers/Configuracoes';


/* Modulo 25 pagina de perfil */
import Perfil from './containers/Perfil';


/* modulo 27 fazendo login com localStorage */
import { initApp } from './actions'


/* modulo 27 -  login com sucesso : autenticação  de rotas */
import noAuth from './containers/HOC/noAuth';

class App extends Component {

	componentDidMount() {
		
		initApp();
	}


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
						<Route path={'/produtos'} component={base(Produtos)} />
						<Route path={'/produto/:id'} component={base(Produto)} />
						<Route path={'/avaliacoes/:id'} component={base(Avaliacoes)} />
						<Route path={'/avaliacao/:id'} component={base(Avaliacao)} />
						<Route path={'/configuracoes'} component={base(Configuracoes)} />
						<Route path={'/perfil'} exact component={base(Perfil)} />
						
						<Route path={'/Login'} component={noAuth(Login)} />
						<Route path={'/recuperar-senha'} component={noAuth(RecuperarSenha)} />
						<Route path={'/resetar-senha/:token'} component={noAuth(ResetarSenha)} />
					</div>
				</Router>
			</Provider>
		);
	} 
}

export default App;
