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


/* Modulo 31  - detalhes do produto  - 
 preparando as actions e reducer.

*/

import { connect } from 'react-redux';
import * as actions from '../../actions/produtos';
import AlertGeral from '../../components/Alert/Geral';

 
class DetalhesProduto extends Component {
	generateStateProduto = (props) => ({
		nome: props.produto ? props.produto.titulo : '',
		disponibilidade: props.produto ? (props.produto.disponibilidade ? 'disponivel' : 'indisponivel') : '',
		descricao: props.produto ? props.produto.descricao : '',
		categoria: props.produto ? props.produto.categoria : '',
		fotos: props.produto ? props.produto.fotos : '',
		preco: props.produto ? props.produto.preco : '',
		promocao: props.produto ? props.produto.promocao : '',
		parcelado: props.produto ? props.produto.parcelado : 1,
		sku: props.produto ? props.produto.sku : '',
	});

	constructor(props) {
		super();
		this.state = {
			...this.generateStateProduto(props),
			aviso: null,
			erros: {},
		};
	}

	componentDidUpdate(prevProps) {
		if ((!prevProps.produto && this.props.produto) || (prevProps.produto && this.props.produto && prevProps.produto.updatedAt !== this.props.produto.updatedAt))
			this.setState(this.generateStateProduto(this.props));
	}

	validate() {
		const { nome, descricao, categoria, preco, sku } = this.state;
		const erros = {};

		if (!nome) erros.nome = 'Preencha aqui com o nome do produto';
		if (!descricao) erros.descricao = 'Preencha aqui com a descrição do produto';
		if (!categoria) erros.categoria = 'Preencha aqui com a categoria do produto';
		if (!preco) erros.preco = 'Preencha aqui com o preço do produto';
		if (!sku) erros.sku = 'Preencha aqui com o sku do produto';

		this.setState({ erros });

		return !(Object.keys(erros).length > 0);
	}

	updateProduto() {
		const { usuario, produto, updateProduto } = this.props;
		if (!usuario || !produto || !this.validate()) return null;
		updateProduto(this.state, produto._id, usuario.loja, (error) => {
			this.setState({
				aviso: {
					status: !error,
					msg: error ? error.message : 'Produto atualizado com sucesso',
				},
			});
		});
	}

	renderCabecalho() {
		const { nome } = this.state;

		const { produto } = this.props;

		return (
			<div className='flex'>
				<div className='flex-1 flex vertical'>
					<Titulo tipo='h1' titulo={nome} />
					{produto && (
						<Link to={`/avaliacoes/${produto._id}`}>
							<small>Ver avaliações</small>
						</Link>
					)}
				</div>

				<div className='flex-1 flex flex-end'>
					<ButtonSimples type='success' label='Salvar' onClick={() => this.updateProduto()} />
				</div>
			</div>
		);
	}

	onChangeInput = (field, value) => this.setState({ [field]: value }, () => this.validate());

	renderDados() {
		const { nome, disponibilidade, descricao, categoria, preco, promocao, sku, erros, parcelado } = this.state;

		const { categorias } = this.props;

		return (
			<div className='Dados-Produto'>
				<TextoDados chave='Nome' valor={<InputValor value={nome} noStyle name='nome' erro={erros.nome} handleSubmit={(valor) => this.onChangeInput('nome', valor)} />} />

				<TextoDados
					chave='Disponibilidade'
					valor={
						<InputSelect
							name='disponibilidade'
							onChange={(ev) => this.onChangeInput('disponibilidade', ev.target.value)}
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
							onChange={(ev) => this.onChangeInput('categoria', ev.target.value)}
							value={categoria}
							opcoes={(categorias || []).map((item) => ({ label: item.nome, value: item._id }))}
						/>
					}
				/>

				<br />
				<TextoDados
					chave='Descrição'
					vertical
					valor={<textarea name={'descricao'} onChange={(ev) => this.setState({ descricao: ev.target.value })} value={descricao} rows='10' style={{ resize: 'nome' }} />}
				/>

				<TextoDados
					chave='Preço'
					valor={<InputValor value={preco} noStyle name='nome' erro={erros.preco} handleSubmit={(valor) => this.onChangeInput('preco', valor)} />}
				/>

				<TextoDados
					chave='Preçõ em promoção'
					valor={<InputValor value={promocao} noStyle name='promocao' erro={erros.promocao} handleSubmit={(valor) => this.onChangeInput('promocao', valor)} />}
				/>

				<TextoDados chave='SKU' valor={<InputValor value={sku} noStyle name='sku' erro={erros.sku} handleSubmit={(valor) => this.onChangeInput('sku', valor)} />} />

				<TextoDados
					chave='Parcelado'
					valor={
						<InputSelect
							name='parcelado'
							onChange={(ev) => this.onChangeInput('parcelado', ev.target.value)}
							value={parcelado}
							opcoes={[
								{ label: '1 Parcela', value: 1 },
								{ label: '2 Parcelas', value: 2 },
								{ label: '3 Parcelas', value: 3 },
								{ label: '4 Parcelas', value: 4 },
								{ label: '5 Parcelas', value: 5 },
								{ label: '6 Parcelas', value: 6 },
								{ label: '7 Parcelas', value: 7 },
								{ label: '8 Parcelas', value: 8 },
								{ label: '9 Parcelas', value: 9 },
								{ label: '10 Parcelas', value: 10 },
							]}
						/>
					}
				/>
			</div>
		);
	}

	onRemove = (id) => {
		const { usuario, produto } = this.props;
		if (!usuario || !produto) return null;
		const { fotos: _fotos } = this.state;
		const fotos = _fotos.filter((foto, index) => index !== id);
		console.log(fotos);
		if (window.confirm('Você realmente deseja remover essa imagem?')) {
			this.props.removeProdutoImagens(fotos, produto._id, usuario.loja, (error) => {
				this.setState({
					aviso: {
						status: !error,
						msg: error ? error.message : 'Fotos do produto removida com sucesso',
					},
				});
			});
		}
	};

	handleUploadFoto = (ev) => {
		const { usuario, produto } = this.props;
		if (!usuario || !produto) return null;
		const data = new FormData();
		data.append('files', ev.target.files[0]);

		this.props.updateProdutoImagens(data, produto._id, usuario.loja, (error) => {
			this.setState({
				aviso: {
					status: !error,
					msg: error ? error.message : 'Fotos do produto atualizadas com sucesso',
				},
			});
		});
	};

	renderImagens() {
		const { fotos } = this.state;
		return (
			<div className='dados-de-imagens'>
				<BlocoImagens imagens={fotos || []} handleSubmit={this.handleUploadFoto} onRemove={this.onRemove} />
			</div>
		);
	}

	render() {
		return (
			<div className='Detalhes-do-Produto'>
				<Voltar path={'/produtos'} />
				{this.renderCabecalho()}
				<AlertGeral aviso={this.state.aviso} />
				<br />
				<div className='flex horizontal'>
					<div className='flex-1 flex vertical'>{this.renderDados()}</div>

					<div className='flex-1 flex vertical'>{this.renderImagens()}</div>
				</div>
			</div>
		);
	}
}



const mapStateToProps = state => ({

	produto: state.produto.produto,
	categorias: state.categoria.categorias,
	usuario : state.auth.usuario
})

export default connect(mapStateToProps,actions)(DetalhesProduto);