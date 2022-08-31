/* modulo 30 - Categorias
  preparando pagina de categorias e botão novo
*/

import { GET_CATEGORIAS } from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case GET_CATEGORIAS:
			return {
				...state,
				categorias: action.payload.categorias,
			};

		default:
			return state;
	}
};
