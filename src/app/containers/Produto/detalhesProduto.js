/* Modulo 25 preparando a base de produtos */

import React, { Component } from 'react';

import Titulo from '../../components/Texto/Titulo';

import ButtonSimples from '../../components/Button/Simples'

import { TextoDados } from '../../components/Texto/Dados'

import InputValor from '../../components/Inputs/InputValor'


/*Modulo 25 produto 1/4 */
import { Link } from 'react-router-dom'

import InputSelect from '../../components/Inputs/Select'


/*Modulo 25 produto 2/4 */

import BlocoImagens from '../../components/Imagens/Bloco';


import Voltar from '../../components/Links/Voltar'
 
class DetalhesProduto extends Component {
	state = {
		nome: 'Produto 1',
		disponibilidade: 'disponivel',
		descricao: '',
		imagens: [
			'https://dummyimage.com/100x100/a49430/fff.jpg',
			'https://dummyimage.com/100x100/b39414/fff.jpg',
			'https://dummyimage.com/100x100/c39414/fff.jpg',
			'https://dummyimage.com/100x100/d39414/fff.jpg',
			'https://dummyimage.com/100x100/e39414/fff.jpg',
			'https://dummyimage.com/100x100/f39414/fff.jpg',
		],
		categoria : 'Padrão'
	};

	renderCabecalho() {
		const { nome } = this.state;

		return (
			<div className='flex'>
				<div className='flex-1 flex vertical'>
					<Titulo tipo='h1' titulo={nome} />
					<Link to='/avaliacoes/IKDD124545'>
						<small>Ver avaliações</small>
					</Link>
				</div>

				<div className='flex-1 flex flex-end'>
					<ButtonSimples type='success' label='Salvar' onClick={() => alert('Salvo!')} />
				</div>
			</div>
		);
	}

	renderDados() {
		const { nome, disponibilidade, descricao , categoria} = this.state;

		return (
			<div className='Dados-Produto'>
				<TextoDados chave='Nome' valor={<InputValor value={nome} noStyle name='nome' handleSubmit={(valor) => this.setState({ nome: valor })} />} />
				<TextoDados
					chave='Disponibilidade'
					valor={
						<InputSelect
							name='disponibilidade'
							onChange={(ev) => this.setState({ disponibilidade: ev.target.value })}
							value={disponibilidade}
							opcoes={[
								{ label: 'Disponível', value: 'disponivel' },
								{ label: 'Indisponível', value: 'indisponivel' },
							]}
						/>
					}
				/>
				<br />
				<TextoDados
					chave='Categoria'
					valor={
						<InputSelect
							name='categoria'
							onChange={(ev) => this.setState({ categoria: ev.target.value })}
							value={categoria}
							opcoes={[
								{ label: 'Padrão', value: 'padrao' },
								{ label: 'Diversos', value: 'diversos' },
								{ label: 'Acessórios', value: 'acessorios' },
								{ label: 'Utilidades', value: 'utilidades' },
							]}
						/>
					}
				/>

				<br />

				<TextoDados
					chave='Descrição'
					vertical
					valor={<textarea name={'descricao'} onChange={(ev) => this.setState({ descricao: ev.target.value })} value={descricao} rows='10' style={{ resize: 'nome' }} />}
				/>
			</div>
		);
	}

	onRemove = (id) => {
		const { imagens } = this.state;
		this.setState({ imagens: imagens.filter((i, idx) => idx !== id) });
	};

	renderImagens() {
		const { imagens } = this.state;
		return (
			<div className='dados-de-imagens'>
				<BlocoImagens imagens={imagens} handleSubmit={() => alert('enviado')} onRemove={this.onRemove} />
			</div>
		);
	}

	render() {
		return (
			<div className='Detalhe-do-Produto'>
				<Voltar path="/produtos"/>
				{this.renderCabecalho()}
				<br />
				<div className='flex horizontal'>
					<div className='flex-1 flex vertical'>{this.renderDados()}</div>

					<div className='flex-1 flex vertical'>{this.renderImagens()}</div>
				</div>
			</div>
		);
	}
}

export default DetalhesProduto;