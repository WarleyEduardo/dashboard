
import { getHeaders } from './localStorage';
import axios from 'axios';
import { urlLojas } from '../config';
import errorHandling from './errorHandling';
import { GET_LOJA } from './types';

export const getLoja = (id) => {	

	return function (dispatch) {

	
		axios.get(`${urlLojas}/${id}`, getHeaders())
			.then(response => {
				dispatch({ type: GET_LOJA, payload: response.data });					
			})
			.catch(errorHandling)
		
	}	   

};

export const updateLoja = (loja, id, cb) => {
	
	console.log(loja);


	return function (dispatch) {
		axios
			.put(
				`${urlLojas}/${id}?loja=${id}`,
				{
					nome: loja.nome,
					cnpj: loja.cnpj,
					email: loja.email,
					telefones: loja.telefones,
					endereco: {
						local: loja.local,
						bairro: loja.bairro,
						numero: loja.numero,
						complemento: loja.complemento,
						cidade: loja.cidade,
						estado: loja.estado,
						CEP: loja.CEP
					},
				},

				getHeaders()
			)
			.then((response) => {
				dispatch({ type: GET_LOJA, payload: response.data });
				console.log(response.data);
				cb(null);
			})
			.catch((e) => cb(errorHandling(e)));
	};
};