/* modulo 32 - variações - preparando base para nova variação */
import { getHeaders } from './localStorage';
import axios from 'axios';
import { urlVariacoes } from '../config';
import errorHandling from './errorHandling';
import { GET_VARIACOES, GET_VARIACAO, LIMPAR_VARIACAO, REMOVER_VARIACAO } from './types';



export const getVariacoes = (loja, produto) => {
	return function (dispatch) {
		axios.get(`${urlVariacoes}?loja=${loja}&produto=${produto}`, getHeaders())
			.then(response => dispatch({ type: GET_VARIACOES, payload: response.data }))
		    .catch(errorHandling)
	};
};

export const getVariacao = (id , loja, produto) => {
	return function (dispatch) {
		axios
			.get(`${urlVariacoes}/${id}?loja=${loja}&produto=${produto}`, getHeaders())
			.then((response) => dispatch({ type: GET_VARIACAO, payload: response.data }))
			.catch(errorHandling);
	};
};

export const limparVariacao = () => ({ type: LIMPAR_VARIACAO });

/* modulo 32 - variações - criando pagina de nova variação  1/2 */

export const salvarVariacao = (variacao, produto, loja, cb) => {
	

	
	return function (dispatch) {
		
		axios.post(`${urlVariacoes}?loja=${loja}&produto=${produto}`,
			{
				codigo: variacao.codigo,
				nome: variacao.nome,
				preco: variacao.preco,
				promocao: variacao.promocao,
				quantidade: variacao.quantidade,
				entrega: {
					freteGratis: (variacao.freteGratis === 'sim'),
					pesoKg: variacao.peso,
					dimensoes: {
						alturaCm: variacao.altura,
						larguraCm: variacao.largura,
						profundidadeCm: variacao.comprimento
					}
				}
			},
			getHeaders()
		).then(response => {
			dispatch({ type: GET_VARIACAO, payload: response.data });
		
			cb(null);
		}).catch((e) => cb(errorHandling(e)));
	}
}