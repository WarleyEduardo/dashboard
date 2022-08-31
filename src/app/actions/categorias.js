import { getHeaders } from './localStorage';
import axios from 'axios';
import { urlCategorias } from '../config';
import errorHandling from './errorHandling';
import { GET_CATEGORIAS } from './types';


export const getCategorias = (atual, limit, loja) => {
	
	return function (dispatch) {
		axios.get(`${urlCategorias}?offset=${atual}&limit=${limit}&loja=${loja}`, getHeaders())
		.then((response) => { dispatch({ type: GET_CATEGORIAS, payload: response.data }) })
		.catch(errorHandling)
   }

}