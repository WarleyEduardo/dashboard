/* Modulo 25 detalhes do produto 3/4 */
import React, { Component } from 'react';

import Titulo from '../../../components/Texto/Titulo'

import ButtonSimples from '../../../components/Button/Simples'

import InputValor from '../../../components/Inputs/InputValor';

import { TextoDados } from '../../../components/Texto/Dados';

//import InputSelect from '../../../components/Inputs/Select';


import BlocoImagens from '../../../components/Imagens/Bloco';


/* modulo 32 - Detalhes da variação -fazendo integraçaõ da pagina  1/2 */
import AlertGeral from '../../../components/Alert/Geral'
import { connect } from 'react-redux';
import * as actions from '../../../actions/variacoes';


class OpcaoVariacao extends Component {
	generateStateVariacao = (props) => ({
		codigo: props.variacao ? props.variacao.codigo : '',
		nome: props.variacao ? props.variacao.nome : '',
		preco: props.variacao ? props.variacao.preco : 0,
		promocao: props.variacao ? props.variacao.promocao : 0,
		quantidade: props.variacao ? props.variacao.quantidade : 0,
		peso: props.variacao ? props.variacao.peso : 0,
		freteGratis: props.variacao ? (props.variacao.freteGratis ? 'sim' : 'nao') : '',
		largura: props.variacao ? props.variacao.largura : 0,
		altura: props.variacao ? props.variacao.altura : 0,
		comprimento: props.variacao ? props.variacao.comprimento : 0,
		fotos: props.variacao ? props.variacao.fotos : [],
	});

	constructor(props) {
		super();
		this.state = {
			...this.generateStateVariacao(props),
			aviso: null,
			erros: {},
		};
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.variacao && this.props.variacao && prevProps.variacao && this.props.variacao && prevProps.variacao.updatedAt !== this.props.variacao.updatedAt)
			this.setState(this.generateStateVariacao(this.props));
	}

	componentWillUnmount() {
		this.props.limparVariacao();
	}

	onChangeInput = (field, value) => this.setState({ [field]: value }, () => this.validate());

	validate() {
		const { codigo, nome, preco, quantidade, peso, largura, altura, comprimento } = this.state;
		const erros = {};

		if (!codigo) codigo.erro = 'Preenchar aqui com o código da variação';
		if (!nome) codigo.nome = 'Preenchar aqui com o nome da variação';
		if (!preco) codigo.preco = 'Preenchar aqui com o preço da variação';
		if (!quantidade) codigo.quantidade = 'Preenchar aqui com a quantidade da variação';
		if (!peso) codigo.peso = 'Preenchar aqui com o peso  da variação';
		if (!largura) codigo.largura = 'Preenchar aqui com a largura da variação';
		if (!altura) codigo.altura = 'Preenchar aqui com a altura da variação';
		if (!comprimento) codigo.comprimento = 'Preenchar aqui com o comprimento da variação';

		this.setState({ erros });

		return !(Object.keys(erros).length > 0);
	}

	updateVariacao() {
		const { produto, variacao, usuario } = this.props;
		if (!usuario || !variacao || !produto || !this.validate()) return null;

		this.props.updateVariacao(this.state, variacao._id, produto._id, usuario.loja, (error) => {
			this.setState({
				aviso: {
					status: !error,
					msg: error ? error.message : 'Variação atualizada com sucesso',
				},
			});

			this.props.getVariacoes(produto._id, usuario.loja);
		});
	}

	removeVariacao() {
		const { produto, variacao, usuario } = this.props;
		if (!usuario || !variacao || !produto ) return null;

		this.props.removeVariacao(variacao._id, produto._id, usuario.loja, (error) => {
			this.setState({
				aviso: {
					status: !error,
					msg: error ? error.message : 'Variação removida com sucesso',
				},
			});

			this.props.getVariacoes(produto._id, usuario.loja);
		});
	}

	renderCabecalho() {
		const { nome } = this.state;
		return (
			<div className='flex horizontal'>
				<div className='flex-1'>
					<Titulo tipo='h3' titulo={'Variacao - ' + nome} />
				</div>
				<div className='flex-1 flex flex-end'>
					<ButtonSimples
						type='success'
						onClick={() => this.updateVariacao()}
						label='Salvar' />
						<ButtonSimples
						type='danger'
						onClick={() => this.removeVariacao()}
						label='Remover' />
				</div>
			</div>
		);
	}

	renderDadosCadastrais() {
		const { nome, codigo , preco, promocao, quantidade , erros } = this.state;

		return (
			<div className='Dados-Produto'>
				<TextoDados chave='Código' valor={<InputValor erro={erros.codigo} value={codigo} noStyle name='codigo' handleSubmit={(valor) => this.onChangeInput('codigo', valor)} />} />

				<TextoDados chave='Nome' erro={erros.nome} valor={<InputValor value={nome} noStyle name='nome' handleSubmit={(valor) => this.onChangeInput('nome', valor )} />} />

				<TextoDados
					chave='Preço Padrão'
					valor={<InputValor erro={erros.preco} value={preco} noStyle name='preco' type='number' handleSubmit={(valor) => this.onChangeInput('preco', valor)} />}
				/>

				<TextoDados
					chave='Preço Promocional'
					valor={
						<InputValor
							erro={erros.promocao}
							value={promocao}
							noStyle
							name='promocao'
							type='number'
							handleSubmit={(valor) => this.onChangeInput('promocao', valor)}
						/>
					}
				/>

				<TextoDados
					chave='Quantidade'
					erro={erros.quantidade}
					valor={<InputValor value={quantidade} noStyle name='quantidade' handleSubmit={(valor) => this.setState({ quantidade: valor })} />}
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
					valor={<InputValor value={peso} noStyle name='peso' type='number' handleSubmit={(valor) => this.setState({ peso: Number(valor) })} />}
				/>

				<TextoDados
					chave='Largura (cm)'
					valor={<InputValor value={largura} noStyle name='largura' type='number' handleSubmit={(valor) => this.setState({ largura: Number(valor) })} />}
				/>

				<TextoDados
					chave='Comprimento (cm)'
					valor={<InputValor value={comprimento} noStyle name='comprimento' type='number' handleSubmit={(valor) => this.setState({ comprimento: Number(valor) })} />}
				/>

				<TextoDados
					chave='Altura (cm)'
					valor={<InputValor value={altura} noStyle name='altura' type='number' handleSubmit={(valor) => this.setState({ altura: Number(valor) })} />}
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
	
const mapStateToProps = state => ({

	variacao: state.variacao.variacao,
	produto: state.produto.produto,
	usuario : state.auth.usuario
	
})

export default connect(mapStateToProps,actions)(OpcaoVariacao);