/* Modulo 29 - Dashboard - integração clientes */
import { GET_CLIENTES , GET_CLIENTE, GET_CLIENTE_PEDIDOS, LIMPAR_CLIENTE, REMOVER_CLIENTE } from '../actions/types';

export default (state = {}, action) => {
	
	switch (action.type) {
		case GET_CLIENTES:
			return {
				...state,
				clientes: action.payload.clientes
			}
		case GET_CLIENTE: {
			return {
				...state,
				cliente: action.payload.cliente
			};
		}
		case LIMPAR_CLIENTE: {
			return {
			  
				...state,
				cliente : null
		  }	

		}
		case GET_CLIENTE_PEDIDOS: {
			return {
				...state,
				clientePedidos: action.payload.pedidos
			}
		}
		case REMOVER_CLIENTE: {
			return {
				...state,
				cliente : {...state.cliente, deletado: action.payload.deletado}
			}
		}	
		
		default: return state;
	}
}