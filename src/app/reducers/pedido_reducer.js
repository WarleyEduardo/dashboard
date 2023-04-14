/* Modulo 28 integração de pedidos */

import { GET_PEDIDOS, GET_PEDIDO, CANCELAR_PEDIDO, LIMPAR_PEDIDO, STATE_ATUAL, LIMPAR_STATE_ATUAL } from '../actions/types';

export default (state = {}, action) =>{
	
	switch (action.type) {
		case GET_PEDIDOS:
			return {
				...state,
				pedidos: action.payload.pedidos,
			};

		case GET_PEDIDO:
			return {
				...state,
				pedido: action.payload,
			};

		case LIMPAR_PEDIDO:
			return {
				...state,
				pedido: null,
			};

		case CANCELAR_PEDIDO: {
			return {
				...state,
				pedido: {
					...state.pedido,
					pedido: {
						...state.pedido.pedido,
						cancelado: action.payload.cancelado,
					},
				},
			};
		}

		case STATE_ATUAL: {
			return {
				...state,
				stateAtual: action.stateAtual,
			};
		}

		case LIMPAR_STATE_ATUAL:
			return {
				...state,
				stateAtual: null,
			};
		
		default:
			return state;
	}
	

}