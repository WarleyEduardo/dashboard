/* Modulo 27  - Definindo base  e primeira requisição */

import axios from 'axios';
import { LOGIN_USER, LOGOUT_USER } from './types'; 
import { urlUsuarios , urlLoginAdmin } from '../config';


/* Modulo 27 login com erro : criando  Error handling 2/2 */


import { saveToken, cleanToken, getHeaders } from './localStorage';
import errorHandling  from './errorHandling';
import moment from 'moment';

export const initApp = () => {
	
	const opcaoLembrar = localStorage.getItem('opcaoLembrar');


	if (opcaoLembrar === "false") {
		console.log('é falso');cleanToken();
	}
}

//usuarios
// Error handling


export const handleLogin = ({ email, password , opcaoLembrar}, callback) => {
	
	return function (dispatch) {
			axios.post(urlLoginAdmin, { email, password })
			.then((response) => {
				saveToken(response.data.usuario, opcaoLembrar);
				dispatch({ type: LOGIN_USER, payload: response.data });
			})
			.catch((e) => callback(errorHandling(e)));
	}
}


export const getUser = () => {
	
	
	return function (dispatch) {
		axios.get(urlUsuarios, getHeaders())
			.then((response) => {
				saveToken(response.data.usuario, true);
				dispatch({ type: LOGIN_USER, payload: response.data });
			})
			.catch((error) => {
				console.log(error, error.response, error.response.data);
			});
	}
}

/* modulo 35 - integração perfil */

export const updateUser = (dados,cb) => {
	return function (dispatch) {
		axios
			.put(urlUsuarios, dados,getHeaders())
			.then((response) => {
				saveToken(response.data.usuario, true);
				dispatch({ type: LOGIN_USER, payload: response.data });
				cb(null)
			})
			.catch((error) => cb(errorHandling(error)));
	};
};



export const handleLogout = () => {
	cleanToken();
	return {type: LOGOUT_USER };
}


export const formatMoney = (valor) => {


	return `R$ ${valor.toFixed(2).split(".").join(",")}`
	

};

export const transformeDate = (data, divisor, formato) => {

	const _data = data.split(divisor);
	const dia = Number(_data[0] + 1);
	const mes = Number(_data[1] - 1);
	const ano = Number(_data[2]);

	return moment(new Date(ano, mes, dia)).format(formato);
};