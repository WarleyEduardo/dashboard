/* modulo 33 - integração avaliações - detalhes da avaliação*/
import { getHeaders } from './localStorage';
import axios from 'axios';
import { urlAvaliacoes } from '../config';
import errorHandling from './errorHandling';
import {
	    GET_AVALIACOES, GET_AVALIACAO, LIMPAR_AVALIACAO, REMOVER_AVALIACAO
} from './types';
	  

export const getAvaliacoes = (produto, loja) => {
	
	return function (dispatch) {
		axios.get(`${urlAvaliacoes}?loja=${loja}&produto=${produto}`, getHeaders())
			.then(response => dispatch({ type: GET_AVALIACOES, payload : response.data }))
	}
};

export const getAvaliacao = (id,produto, loja) => {
	return function (dispatch) {
		axios.get(`${urlAvaliacoes}/${id}?loja=${loja}&produto=${produto}`, getHeaders()).then((response) => dispatch({ type: GET_AVALIACAO, payload: response.data }));
	};
};

export const limparAvaliacao = () => ({ type: LIMPAR_AVALIACAO });

export const removeAvaliacao = (id, produto, loja , cb) => {
	return function (dispatch) {
		axios.delete(`${urlAvaliacoes}/${id}?loja=${loja}&produto=${produto}`, getHeaders())
			.then((response) => {
				dispatch({ type: REMOVER_AVALIACAO, payload: response.data });
				cb(null)
			}
			).catch((e)=> cb(errorHandling(e)))
	};

};

