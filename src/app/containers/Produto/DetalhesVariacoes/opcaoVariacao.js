/* Modulo 25 detalhes do produto 3/4 */
import React, { Component } from 'react';

import Titulo from '../../../components/Texto/Titulo'

import ButtonSimples from '../../../components/Button/Simples'

import InputValor from '../../../components/Inputs/InputValor';

import { TextoDados } from '../../../components/Texto/Dados';

import InputSelect from '../../../components/Inputs/Select';


import BlocoImagens from '../../../components/Imagens/Bloco';


class OpcaoVariacao extends Component {
	state = {
		nome: 'P',
		disponibilidade: 'disponível',
		preco: 30,
		promocao: 25,
		quantidade: 200,
		peso: 0.75,
		largura: 3,
		altura: 5,
		comprimento: 17,
		imagens: [
			'https://dummyimage.com/100x100/103020/fff.jpg',
			'https://dummyimage.com/100x100/103020/fff.jpg',
			'https://dummyimage.com/100x100/103020/fff.jpg',
			'https://dummyimage.com/100x100/103020/fff.jpg',
			'https://dummyimage.com/100x100/103020/fff.jpg',
			'https://dummyimage.com/100x100/103020/fff.jpg',
		],
	};

	renderCabecalho() {
		const { nome } = this.state;
		return (
			<div className='flex horizontal'>
				<div className='flex-1'>
					<Titulo tipo='h3' titulo={'Variacao - ' + nome} />
				</div>
				<div className='flex-1 flex flex-end'>
					<ButtonSimples type='success' onClick={() => alert('salvo')} label='Salvar' />
				</div>
			</div>
		);
	}

	renderDadosCadastrais() {
		const { nome, disponibilidade, preco, promocao, quantidade } = this.state;

		return (
			<div className='Dados-Produto'>
				<TextoDados chave='Nome'
					valor={<InputValor value={nome}
						noStyle
						name='nome'
						handleSubmit={(valor) => this.setState({ nome: valor })}
					/>}
				/>
				<TextoDados
					chave='Disponibilidade'
					valor={
						<InputSelect
							name='disponibilidade'
							handleSubmit={(ev) => this.setState({ disponibilidade: ev.target.value })}
							value={disponibilidade}
							opcoes={[
								{ label: 'Disponível', value: 'disponivel' },
								{ label: 'Indisponível', value: 'indisponivel' },
							]}
						/>
					}
				/>

				<TextoDados
					chave='Preço Padrão'
					valor={<InputValor
						value={preco}
						noStyle
						name='preco'
						type='number'
						handleSubmit={(valor) => this.setState({ preco: Number(valor) })}
					/>}
				/>

				<TextoDados
					chave='Preço Promocional'
					valor={<InputValor
						value={promocao}
						noStyle
						name='promocao'
						type='number'
						handleSubmit={(valor) => this.setState({ promocao: Number(valor) })}
					/>}
				/>

				<TextoDados
					chave='Quantidade'
					valor={<InputValor
						value={quantidade}
						noStyle
						name='quantidade'
						handleSubmit={(valor) => this.setState({ quantidade: valor })}
					/>}
				/>
			</div>
		);
	}

	renderDadosEnvio() {
		const { peso, largura, comprimento, altura } = this.state;

		return (
			<div className='Dados-Envio'>
				<TextoDados
					chave='Peso (Kg)'
					valor={<InputValor
						value={peso}
						noStyle
						name='peso'
						type='number'
						handleSubmit={(valor) => this.setState({ peso: Number(valor) })}
					/>}
				/>

				<TextoDados
					chave='Largura (cm)'
					valor={<InputValor
						value={largura}
						noStyle
						name='largura'
						type='number'
						handleSubmit={(valor) => this.setState({ largura: Number(valor) })}
					/>}
				/>

				<TextoDados
					chave='Comprimento (cm)'
					valor={<InputValor
						value={comprimento}
						noStyle
						name='comprimento'
						type='number'
						handleSubmit={(valor) => this.setState({ comprimento: Number(valor) })}
					/>}
				/>

				<TextoDados
					chave='Altura (cm)'
					valor={<InputValor
						value={altura}
						noStyle
						name='altura'
						type='number'
						handleSubmit={(valor) => this.setState({ altura: Number(valor) })}
					/>}
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
			<div className='Opcao-variacao'>
				{this.renderCabecalho()}
				<br />
				<div className='flex horizontal'>
					<div className='flex-1'>{this.renderDadosCadastrais()},</div>
					<div className='flex-1'>{this.renderDadosEnvio()},</div>
					<div className='flex-1'>{this.renderImagens()}</div>
				</div>
			</div>
		);
	}
}
	

export default OpcaoVariacao;