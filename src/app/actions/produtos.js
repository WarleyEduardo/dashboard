/* modulo 31 - produtos - preparando actions e reducer */

import { getHeaders } from './localStorage';
import axios from 'axios';
import { urlProdutos} from '../config';
import errorHandling from './errorHandling';
import { GET_PRODUTOS ,GET_PRODUTO} from './types';


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


export const novoProduto = ( produto, loja , cb) => {
	return function (dispatch) {
		axios
			.post(`${urlProdutos}/?loja=${loja}`,
				{  
					titulo: produto.nome,
					descricao: produto.descricao,
					categoria: produto.categoria,
					preco: produto.preco,
					promocao: produto.promocao,
					sku: produto.sku


				},
				
				getHeaders())
			.then((response) => {
				dispatch({ type: GET_PRODUTO, payload: response.data });
				cb(null)
			})
			.catch( (e) => cb(errorHandling(e)));
	};
};