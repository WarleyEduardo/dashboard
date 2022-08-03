/* Modulo 28 integração de pedidos */

import { getHeaders } from './localStorage';
import axios from 'axios';
import { urlPedidosAdmin, urlPedidosPesquisa } from '../config/';
import errorHandling from './errorHandling'
import {GET_PEDIDOS} from './types'

export const getPedidos = (atual,limit,loja) => {	

	return function (dispatch) {
		axios
			.get(`${urlPedidosAdmin}?offset=${atual}&limit=${limit}&loja=${loja}`, getHeaders())
			.then((response) => {
				dispatch({ type: GET_PEDIDOS, payload: response.data });
			})
			.catch(errorHandling);
	}

}

/* modulo 28 - Pedidos : criando a parte de pesquisa */

export const getPedidosPesquisa = (termo, atual, limit, loja) => {
	return function (dispatch) {
		axios
			.get(`${urlPedidosPesquisa}/${termo}/pedidos?offset=${atual}&limit=${limit}&loja=${loja}`, getHeaders())
			.then((response) => {
				dispatch({ type: GET_PEDIDOS, payload: response.data });
			})
			.catch(errorHandling);
	};
};
