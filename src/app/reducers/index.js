// Modulo 21 - Dashboard  - instalando o redux e preparando as pastas.
import { combineReducers } from 'redux';


/* Modulo 27 -  login com sucess: autenticação de rota */
import authReducer from './auth_reducer';


/* Modulo 28 integração de pedidos */

import pedidoReducer from './pedido_reducer';

const reducers = combineReducers({
	auth: authReducer,
	pedido: pedidoReducer
});

export default reducers;