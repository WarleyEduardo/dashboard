/* modulo 30 - Categorias
  preparando pagina de categorias e botão novo
*/

import { getHeaders } from './localStorage';
import axios from 'axios';
import { urlCategorias } from '../config';
import errorHandling from './errorHandling';
import {
	GET_CATEGORIAS,
	GET_CATEGORIA,
	LIMPAR_CATEGORIA,
	GET_CATEGORIA_PRODUTOS,
	REMOVER_CATEGORIA
} from './types';

export const getCategorias = (loja) => {
	return function (dispatch) {
		axios
			.get(`${urlCategorias}?loja=${loja}`, getHeaders())
			.then((response) => {
				dispatch({ type: GET_CATEGORIAS, payload: response.data });
			})
			.catch(errorHandling);
	};
};



/* modulo 30 -  categorias
  Criando pagina de nova categoria.
*/


export const salvarCategoria = (categoria, loja, cb) => {

	return function (dispatch) {
		
		axios.post(`${urlCategorias}?loja=${loja}`, {
			nome: categoria.nome,
			codigo: categoria.codigo
		}, getHeaders())
			.then(response => {
				dispatch({ type: GET_CATEGORIAS, payload: response.data });
				cb(null)
		}).catch(e => cb(errorHandling(e)))
	}
};



/* Modulo 30 - Detalhes da categoria 
  configuracação das actions e reducer
*/


export const getCategoria = (id , loja) => {
	return function (dispatch) {
		axios
			.get(`${urlCategorias}/${id}?loja=${loja}`, getHeaders())
			.then((response) => {
				dispatch({ type: GET_CATEGORIA, payload: response.data });
			})
			.catch(errorHandling);
	};
};


export const getCategoriaProdutos = (id, atual,limit, loja) => {
	return function (dispatch) {
		axios
			.get(`${urlCategorias}/${id}/produtos?loja=${loja}&offset=${atual}&limit=${limit}`, getHeaders())
			.then((response) => {
				dispatch({ type: GET_CATEGORIA_PRODUTOS, payload: response.data });
			})
			.catch(errorHandling);
	};
};

export const updateCategoria = (categoria, id, loja, cb) => {
	
	return function (dispatch) {
		axios.put(`${urlCategorias}/${id}?loja=${loja}`, {
			nome: categoria.nome,
			codigo: categoria.codigo,
			disponibilidade: categoria.disponibilidade === 'disponivel' ? "true" : "false",
			}, getHeaders())
			.then(response => {
				dispatch({ type: GET_CATEGORIA, payload: response.data });
				cb(null)
			})
		    .catch( (e)=> cb(errorHandling(e)))
	}
}


export const removerCategoria = (id, loja, cb) => {
	return function (dispatch) {
		axios.delete(`${urlCategorias}/${id}?loja=${loja}`, getHeaders())
			.then((response) => {
				dispatch({ type: REMOVER_CATEGORIA, payload: response.data });
				cb(null)
			})
			.catch( (e)=> cb(errorHandling(e)))
	};
};



export const limparCategoria = () => ( {
	
	type: LIMPAR_CATEGORIA
});