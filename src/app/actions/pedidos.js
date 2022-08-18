/* Modulo 28 integração de pedidos */

import { getHeaders } from './localStorage';
import axios from 'axios';
import { urlPedidosAdmin, urlPedidosPesquisa, urlPagamentos, urlEnregas } from '../config/';
import errorHandling from './errorHandling'
import { GET_PEDIDOS, GET_PEDIDO , CANCELAR_PEDIDO, LIMPAR_PEDIDO } from './types';

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
		axios.get(`${urlPedidosPesquisa}/${termo}/pedidos?offset=${atual}&limit=${limit}&loja=${loja}`, getHeaders())
			.then((response) => {
				dispatch({ type: GET_PEDIDOS, payload: response.data });
			})
			.catch(errorHandling);
	};
};


/* modulo 28 - Detalhes do pedido: criando actions e reducers */

export const getPedido = (id, loja) => {
	
	return function (dispatch) {
		axios.get(`${urlPedidosAdmin}/${id}?loja=${loja}`, getHeaders())
			.then((response) => {
				dispatch({ type: GET_PEDIDO, payload: response.data });				
			})
		.catch(errorHandling)
	}
};


export const cancelarPedido = (id, loja, cb) => {
	return function (dispatch) {
		axios.delete(`${urlPedidosAdmin}/${id}?loja=${loja}`, getHeaders())
			.then((response) => {
				dispatch({ type: CANCELAR_PEDIDO, payload: response.data });
				cb(null)
			})
			.catch(e => cb(errorHandling(e)));
	};
};


export const limparPedido = () => ({ type: LIMPAR_PEDIDO });

export const setNovoStatusPagamento = (status, id, idPedido, loja, cb) => {
	
	return function (dispatch) {
		
		axios.put(`${urlPagamentos}/${id}?loja=${loja}&pedido=${idPedido}`, { status }, getHeaders())
			.then((response) => {
				dispatch(getPedido(idPedido, loja));
				cb(null);
			})
			.catch((e) => cb(errorHandling(e)));
	}


};

export const setNovoStatusEntrega = ({ status, codigoRastreamento }, id, idPedido, loja, cb) => {
	return function (dispatch) {
		axios
			.put(`${urlEnregas}/${id}?loja=${loja}&pedido=${idPedido}`, { status , codigoRastreamento }, getHeaders())
			.then((response) => {
				dispatch(getPedido(idPedido, loja));
				cb(null);
			})
			.catch((e) => cb(errorHandling(e)));
	};
}; 