/* modulo 31 - produtos - preparando actions e reducer */

import { GET_PRODUTOS , GET_PRODUTO } from '../actions/types';

export default (state = {}, action) => {
	
	switch (action.type) {
		case GET_PRODUTO: {
			return {
				...state,
				produto: action.payload.produto,
			};
		}
		case GET_PRODUTOS: {
			return {
				...state,
				produtos: action.payload.produtos,
			};
		}

		default:
			return state;
	}
}