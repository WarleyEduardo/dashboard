
import { GET_LOJA } from '../actions/types';

export default (state = {}, action) => { 

	switch (action.type) {

		case GET_LOJA:
			return {
				...state,
				loja : action.payload.loja
		}
		default: return state;
	}
};

