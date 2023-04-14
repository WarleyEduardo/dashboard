/* Modulo 29 - Dashboard - integração clientes */

import { getHeaders } from './localStorage';
import axios from 'axios';
import { urlClientes, urlClientesPesquisa, urlClientesAdmin } from '../config';
import errorHandling from './errorHandling';
import { GET_CLIENTES, GET_CLIENTE, LIMPAR_CLIENTE, GET_CLIENTE_PEDIDOS, REMOVER_CLIENTE, STATE_ATUAL, LIMPAR_STATE_ATUAL } from './types';

/* modulo 29 - detalhes do cliente - preperando actions , reducer e configurações*/
import { transformeDate } from './index';



export const setStateAtual = (stateAtual) => ({ type: STATE_ATUAL, stateAtual });

export const limpaStateAtual = () => ({ type: LIMPAR_STATE_ATUAL });


export const getClientes = (atual, limit, loja) => {
	
	return function (dispatch) {
		axios.get(`${urlClientes}?offset=${atual}&limit=${limit}&loja=${loja}`, getHeaders())
			.then((response) => {dispatch({ type: GET_CLIENTES, payload: response.data })})
			.catch(errorHandling);
	} 
};

export const getClientesPesquisa = (termo, atual, limit, loja) => {
	return function (dispatch) {
		axios.get(`${urlClientesPesquisa}/${termo}?offset=${atual}&limit=${limit}&loja=${loja}`, getHeaders())
			.then((response) => dispatch({ type: GET_CLIENTES, payload: response.data }))
			.catch(errorHandling);
	};
};


export const LimparCliente = () => ({
	type: LIMPAR_CLIENTE
});


export const getCliente = (id, loja) => {

	return function (dispatch) {
		axios.get(`${urlClientesAdmin}/${id}?loja=${loja}`,getHeaders())
		.then(response => dispatch({ type: GET_CLIENTE, payload: response.data }))
		.catch(errorHandling)
	}
};


export const getPedidosCliente = (id, atual,limit, loja) => {
	return function (dispatch) {
		axios
			.get(`${urlClientesAdmin}/${id}/pedidos?loja=${loja}&offset=${atual}&limit=${limit}`, getHeaders())
			.then((response) => dispatch({ type: GET_CLIENTE_PEDIDOS, payload: response.data }))
			.catch(errorHandling);
	};
};


export const salvarCliente = (cliente, loja, cb) => {
	return function (dispatch) {
		axios.post(	`${urlClientes}?loja=${loja}`,
				{
					nome: cliente.nome,
					password : cliente.password,
					cpf: cliente.cpf,
					email: cliente.email,
					telefones: cliente.telefones,
					endereco: {
						local: cliente.local,
						numero: cliente.numero,
						bairro: cliente.bairro,
						complemento : cliente.complemento,
						cidade: cliente.cidade,
						estado: cliente.estado,
						CEP: cliente.cep,
					},
					dataDeNascimento: transformeDate(cliente.dataDeNascimento, '/', 'YYYY-MM-DD'),
				},
				getHeaders()
			)
			.then((response) => {
				dispatch({ type: GET_CLIENTES, payload: response.data });
				cb(null);
			})
			.catch((e) => cb(errorHandling(e)));
	};
};


export const updateCliente = (cliente , id, loja, cb) => {
	return function (dispatch) {

			axios
				.put(
					`${urlClientesAdmin}/${id}?loja=${loja}`,
					{
						nome: cliente.nome,
						cpf: cliente.CPF,
						email: cliente.email,
						telefones: cliente.telefones,
						/*telefones: [cliente.telefone],*/
						endereco: {
							local: cliente.endereco,
							numero: cliente.numero,
							bairro: cliente.bairro,
							complemento : cliente.complemento,
							cidade: cliente.cidade,
							estado: cliente.estado,
							CEP: cliente.cep,
						},
						dataDeNascimento: transformeDate(cliente.dataDeNascimento, '/', 'YYYY-MM-DD'),
					},
					getHeaders()
				)
				.then((response) => {
					dispatch({ type: GET_CLIENTE, payload: response.data });
					cb(null);
				})
				.catch((e) => cb(errorHandling(e)));
	};
};

export const removerCliente = (id, loja, cb) => {
	return function (dispatch) {
		axios.delete(`${urlClientesAdmin}/${id}?loja=${loja}`,getHeaders())
			.then((response) => {
				dispatch({ type: REMOVER_CLIENTE, payload: response.data });
				cb(null);
			})
			.catch((e) => cb(errorHandling(e)));
	};
};

