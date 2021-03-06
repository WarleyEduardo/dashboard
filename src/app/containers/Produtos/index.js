/* Modulo 25 criando pagina de produtos */

import React, { Component } from 'react';
import Titulo from '../../components/Texto/Titulo';
import Pesquisa from '../../components/Inputs/Pesquisa';
import Tabela from '../../components/Tabela/Simples2';
import Paginacao from '../../components/Paginacao/Simples';

class Produtos extends Component {
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
			    "Produto": 'Mouse 1',
				"Categoria": 'acessorios',
				"Disponível": 'sim',
				"botaoDetalhes": '/produto/kkdsfa014545'
			},
					{
			    "Produto": 'Mouse 2',
				"Categoria": 'acessorios',
				"Disponível": 'sim',
				"botaoDetalhes": '/produto/kkdsfa014545'
			},
					{
			    "Produto": 'Mouse 3',
				"Categoria": 'acessorios',
				"Disponível": 'sim',
				"botaoDetalhes": '/produto/kkdsfa014545'
			},
			{
			    "Produto": 'Mouse 4',
				"Categoria": 'acessorios',
				"Disponível": 'sim',
				"botaoDetalhes": '/produto/kkdsfa014545'
			}
			,
			{
			    "Produto": 'Mouse 5',
				"Categoria": 'acessorios',
				"Disponível": 'sim',
				"botaoDetalhes": '/produto/kkdsfa014545'
			}
					
			
		];

		return (
			<div className='Produtos full-width'>
				<div className='Card'>
					<Titulo tipo='h1' titulo='Produtos' />
					<br />
					<div className='flex'>
						<div className='flex-3'>
							<Pesquisa
								valor={pesquisa}
								placeholder={'Pesquise aqui pelo nome do produtos, descrição ou categoria...'}
								onChange={(ev) => this.onChangePesquisa(ev)}
								onClick={() => alert('Pesquisar')}
							/>
						</div>
						<div className='flex-1 flex vertical'>
							<label>
								<small>Ordernar por</small>
							</label>	
							<select defaultValue="">
								<option>Aleatório</option>
								<option value={'oaA-Z'}>Alfabética A-Z</option>
								<option value={'oaZ-A'}>Alfabética Z-A</option>
								<option value={'op-menor'}>Preço menor</option>
								<option value={'op-maior'}>Preço maior</option>
							</select>
						</div>
					</div>

					<br />
					<Tabela cabecalho={['Produto', 'Categoria', 'Disponível' ,'*Exibir']} dados={dados} />
					<Paginacao atual={this.state.atual} total={120} limite={20} onClick={(numeroAtual) => this.changeNumeroAtual(numeroAtual)} />
				</div>
			</div>
		);
	}
}

export default Produtos;