/* modulo 30 - Categorias
  preparando pagina de categorias e botão novo
*/

import {
	GET_CATEGORIAS,
	GET_CATEGORIA,
	LIMPAR_CATEGORIA,
	REMOVER_CATEGORIA,
	GET_CATEGORIA_PRODUTOS
} from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case GET_CATEGORIAS:
			return {
				...state,
				categorias: action.payload.categorias,
			};

		case GET_CATEGORIA:
			return {
				...state,
				categoria: action.payload.categoria,
			};

		case LIMPAR_CATEGORIA:
		case REMOVER_CATEGORIA:
			return {
				...state,
				categoria: null,
			};
		
		case GET_CATEGORIA_PRODUTOS:
			return {
				...state,
				categoriaProdutos : action.payload.produtos, 
			}

		default:
			return state;
	}
};
