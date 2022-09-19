// Modulo 21 - Dashboard  - instalando o redux e preparando as pastas.
import { combineReducers } from 'redux';


/* Modulo 27 -  login com sucess: autenticação de rota */
import authReducer from './auth_reducer';


/* Modulo 28 integração de pedidos */

import pedidoReducer from './pedido_reducer';


/* Modulo 29 - Dashboard - integração clientes */
import clienteReducer from './cliente_reducer'

import categoriaReducer from './categoria_reducer'

import lojaReducer from './loja_reducer';


/* modulo 31 - produtos - preparando actions e reducer */
import produtoReducer from './produto_reducer'

const reducers = combineReducers({
	auth: authReducer,
	pedido: pedidoReducer,
	cliente: clienteReducer,
	categoria: categoriaReducer,
	loja: lojaReducer,
	produto : produtoReducer
});

export default reducers;