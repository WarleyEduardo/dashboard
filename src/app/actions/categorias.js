/* modulo 30 - Categorias
  preparando pagina de categorias e botão novo
*/

import { getHeaders } from './localStorage';
import axios from 'axios';
import { urlCategorias } from '../config';
import errorHandling from './errorHandling';
import { GET_CATEGORIAS } from './types';

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
