/* modulo 31 - produtos - preparando actions e reducer */

import { getHeaders } from './localStorage';
import axios from 'axios';
import { urlProdutos} from '../config';
import errorHandling from './errorHandling';
import { GET_PRODUTOS ,GET_PRODUTO, LIMPAR_PRODUTO} from './types';


export const getProdutos = (ordem, atual, limit, loja) => {
	return function (dispatch) {
		axios.get(`${urlProdutos}?offset=${atual}&limit=${limit}&loja=${loja}&sortType=${ordem}`, getHeaders())
			.then(response => dispatch({ type: GET_PRODUTOS, payload: response.data }))
		    .catch(errorHandling)
	}
};


export const getProdutosPesquisa = (termo , ordem, atual, limit, loja) => {
	return function (dispatch) {
		axios
			.get(`${urlProdutos}/search/${termo}?offset=${atual}&limit=${limit}&loja=${loja}&sortType=${ordem}`, getHeaders())
			.then((response) => dispatch({ type: GET_PRODUTOS, payload: response.data }))
			.catch(errorHandling);
	};
};


export const salvarProduto = (produto, loja, cb) => {
	return function (dispatch) {
		axios
			.post(
				`${urlProdutos}/?loja=${loja}`,
				{
					titulo: produto.nome,
					descricao: produto.descricao,
					categoria: produto.categoria,
					preco: produto.preco,
					promocao: produto.promocao,
					sku: produto.sku,
				},

				getHeaders()
			)
			.then((response) => {
				dispatch({ type: GET_PRODUTO, payload: response.data });
				cb(null);
			})
			.catch((e) => cb(errorHandling(e)));
	};
};


export const getProduto = ( id, loja) => {
	return function (dispatch) {
		axios
			.get(`${urlProdutos}/${id}?&loja=${loja}`, getHeaders())
			.then((response) => dispatch({ type: GET_PRODUTO, payload: response.data }))
			.catch(errorHandling);
	};
};

export const limparProduto = () => ({
	type: LIMPAR_PRODUTO
})

export const updateProduto = ( produto , id, loja ,cb) => {
	return function (dispatch) {
		axios
			.put(
				`${urlProdutos}/${id}?&loja=${loja}`,
				{
					titulo: produto.nome,
					descricao: produto.descricao,
					disponibilidade: produto.disponibilidade === 'disponivel' ? 'true' : 'false',
					categoria: produto.categoria,
					preco: produto.preco,
					promocao: produto.promocao,
					sku: produto.sku,
				},

				getHeaders()
			)
			.then((response) => {
				dispatch({ type: GET_PRODUTO, payload: response.data })
				cb(null)
			})
			.catch(e => cb(errorHandling(e)));
	};
};


export const removerProdutoImagens = (fotos, id, loja, cb) => {
	return function (dispatch) {
		axios
			.put(
				`${urlProdutos}/${id}?&loja=${loja}`,{fotos},getHeaders()
			)
			.then((response) => {
				dispatch({ type: GET_PRODUTO, payload: response.data });
				cb(null)
			}
			)
			.catch(e => cb(errorHandling(e)));
	};
};

export const updateProdutoImagens = (data, id, loja, cb) => {
	return function (dispatch) {
		axios
			.put(`${urlProdutos}/imagens/${id}?&loja=${loja}`, data, getHeaders())
			.then((response) => {
				dispatch({ type: GET_PRODUTO, payload: response.data });
				cb(null)
			})
			.catch(e => cb(errorHandling(e)));
	};
};
