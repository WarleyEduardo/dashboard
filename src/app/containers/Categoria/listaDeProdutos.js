/* Modulo 25  Categoria  2/2 */

import React, { Component } from 'react';
import Titulo from '../../components/Texto/Titulo';
import Pesquisa from '../../components/Inputs/Pesquisa';
import Tabela from '../../components/Tabela/Simples';
import Paginacao from '../../components/Paginacao/Simples';

class listaDeProdutos extends Component {
	state = {
		pesquisa: '',
		atual: 0,
	};

	onChangePesquisa = (ev) => this.setState({ pesquisa: ev.target.value });

	changeNumeroAtual = (atual) => this.setState({ atual });

	render() {
		const { pesquisa } = this.state;


		const dados = [
			{
				"Produto": 'mouse',
				"Estoque": 20,
				"Disponibilidade" :"sim",
				"botaoDetalhes" :"/produto/kdfsdfa22"
	
			},
			{
				"Produto": 'mouse 2',
				"Estoque": 20,
				"Disponibilidade" :"não",
				"botaoDetalhes" :"/produto/zzdsadfd"
	
			},
									{
				"Produto": 'mouse 3',
				"Estoque": 20,
				"Disponibilidade" :"não",
				"botaoDetalhes" :"/produto/zdsdfsdfsd"
	
			},
												{
				"Produto": 'mouse 4 ',
				"Estoque": 20,
				"Disponibilidade" :"sim",
				"botaoDetalhes" :"/produto/dsfadfafda"
	
			},
															{
				"Produto": 'mouse 5',
				"Estoque": 20,
				"Disponibilidade" :"sim",
				"botaoDetalhes" :"/produto/kdfsdfa22"
	
			},
		];

		return (
			<div className='ListDeProdutos'>
				<br/> <hr/>
				<Titulo tipo='h3' titulo='Produtos da Categoria' />
				<br />
				<Pesquisa
					valor={pesquisa}
					placeholder={'Pesquise aqui pelo nome do produto ou descrição...'}
					onChange={(ev) => this.onChangePesquisa(ev)}
					onClick={() => alert('Pesquisar')}
				/>
				<br />
				<Tabela cabecalho={['Produto', 'Estoque', 'Disponibilidade']} dados={dados} />
				<Paginacao atual={this.state.atual} total={120} limite={20} onClick={(numeroAtual) => this.changeNumeroAtual(numeroAtual)} />
			</div>
		);
	}
}

export default listaDeProdutos;