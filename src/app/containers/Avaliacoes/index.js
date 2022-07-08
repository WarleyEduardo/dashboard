/* Modulo 25  Avaliações */


import React, { Component } from 'react';
import Titulo from '../../components/Texto/Titulo';
import Tabela from '../../components/Tabela/Simples';
import moment from 'moment';
import Voltar from '../../components/Links/Voltar';


class Avaliacoes extends Component {

	render() {
	
		const dados = [
			{
				"Cliente": 'Cliente 1',
				"Data": moment().format("DD/MM/YYYY"),		
				"botaoDetalhes": '/avaliacao/FF4545454'
			},
			{
				"Cliente": 'Cliente 2',
				"Data": moment().format("DD/MM/YYYY"),		
				"botaoDetalhes": '/avaliacao/FF4545454'
			},
			{
				"Cliente": 'Cliente 3',
				"Data": moment().format("DD/MM/YYYY"),		
				"botaoDetalhes": '/avaliacao/FF4545454'
			},
			{
				"Cliente": 'Cliente 4',
				"Data": moment().format("DD/MM/YYYY"),		
				"botaoDetalhes": '/avaliacao/FF4545454'
			},
			{
				"Cliente": 'Cliente 5',
				"Data": moment().format("DD/MM/YYYY"),		
				"botaoDetalhes": '/avaliacao/FF4545454'
			},
			{
				"Cliente": 'Cliente 6',
				"Data": moment().format("DD/MM/YYYY"),		
				"botaoDetalhes": '/avaliacao/FF4545454'
			}
		];

		return (
			<div className='Avaliacoes full-width'>
				<div className='Card'>
					<Voltar path='/produto/dsdfsdfsd' />
					<Titulo tipo='h1' titulo='Avaliações - Produto 1' />
					<br />
					<Tabela cabecalho={['Cliente', 'Data']} dados={dados} />
				</div>
			</div>
		);
	}
}

export default Avaliacoes;