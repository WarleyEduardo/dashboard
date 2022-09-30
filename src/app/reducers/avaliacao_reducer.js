/* modulo 33 - integração avaliações - detalhes da avaliação*/
import { GET_AVALIACOES, GET_AVALIACAO, LIMPAR_AVALIACAO, REMOVER_AVALIACAO } from '../actions/types';

export default (state = {}, action) => {
	switch (action.type) {
		case GET_AVALIACOES:
			return {
				...state,
				avaliacoes: action.payload.avaliacoes,
			};

		case GET_AVALIACAO:
			return {
				...state,
				avaliacao: action.payload.avaliacao,
			};

		case LIMPAR_AVALIACAO:
		case REMOVER_AVALIACAO:
			return {
				...state,
				avaliacao: null,
			};
	
		default:
			return state;
	}
};
