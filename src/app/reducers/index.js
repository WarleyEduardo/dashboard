// Modulo 21 - Dashboard  - instalando o redux e preparando as pastas.
import { combineReducers } from 'redux';


/* Modulo 27 -  login com sucess: autenticação de rota */
import authReducer from './auth_reducer';


/* Modulo 28 integração de pedidos */

import pedidoReducer from './pedido_reducer';


/* Modulo 29 - Dashboard - integração clientes */
import clienteReducer from './cliente_reducer'

import categoriaReducer from './categoria_reducer'

/* modulo 31 - produtos - preparando actions e reducer */
import produtoReducer from './produto_reducer'

/* modulo 32 - variações - preparando base para nova variação */
import variacaoReducer from './variacao_reducer'

/* modulo 33 - integração avaliações - detalhes da avaliação*/
import avaliacaoReducer from './avaliacao_reducer';

/* modulo 34-  dashboard  -  integração configuração  */
import configuracaoReducer from './configuracao_reducer';

const reducers = combineReducers({
	auth: authReducer,
	pedido: pedidoReducer,
	cliente: clienteReducer,
	categoria: categoriaReducer,
	produto: produtoReducer,
	variacao: variacaoReducer,
	avaliacao: avaliacaoReducer,
	configuracao : configuracaoReducer
});

export default reducers;