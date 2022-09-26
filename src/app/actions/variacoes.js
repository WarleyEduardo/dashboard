/* modulo 32 - variações - preparando base para nova variação */
import { getHeaders } from './localStorage';
import axios from 'axios';
import { urlVariacoes } from '../config';
import errorHandling from './errorHandling';
import { GET_VARIACOES, GET_VARIACAO, LIMPAR_VARIACAO, REMOVER_VARIACAO } from './types';



export const getVariacoes = (loja, produto) => {
	return function (dispatch) {
		axios.get(`${urlVariacoes}?loja=${loja}&produto=${produto}`, getHeaders)
			.then(response => dispatch({ type: GET_VARIACOES, payload: response.data }))
		    .catch(errorHandling)
	};
};

export const getVariacao = (id , loja, produto) => {
	return function (dispatch) {
		axios
			.get(`${urlVariacoes}/${id}?loja=${loja}&produto=${produto}`, getHeaders)
			.then((response) => dispatch({ type: GET_VARIACAO, payload: response.data }))
			.catch(errorHandling);
	};
};

export const limparVariacao = ()=>{ type : LIMPAR_VARIACAO}