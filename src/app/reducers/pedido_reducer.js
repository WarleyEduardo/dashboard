/* Modulo 28 integração de pedidos */

import { GET_PEDIDOS } from '../actions/types';

export default (state = {}, action) =>{
	
	switch (action.type) {

				
		case GET_PEDIDOS: 
			
			 console.log(action.payload.pedidos);
			return {
				...state,
				pedidos: action.payload.pedidos
			}
		default: return state 
	}
	

}