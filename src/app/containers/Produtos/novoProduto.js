/* modulo 31 - produtos - criando pagina de novo produto 1/2 */

import React, { Component } from 'react';
import Titulo from '../../components/Texto/Titulo';
import Button from '../../components/Button/Simples';
import { TextoDados } from '../../components/Texto/Dados';
import InputSelect from '../../components/Inputs/Select';
import InputSimples from '../../components/Inputs/Simples';
import Voltar from '../../components/Links/Voltar';
import { connect } from 'react-redux';
import * as actionsProdutos from '../../actions/produtos';
import * as actionsCategorias from '../../actions/categorias';
import AlertGeral from '../../components/Alert/Geral';

class NovoProduto extends Component {
	

	state = {
		nome: "",
		descricao: "",
		categoria: "",
		preco: 0,
		promocao: 0,	
		sku: "",
		aviso: null,
		erros: {}
	}

	getCategorias(props) {
		
		const { usuario, getCategorias } = props;
		if (usuario) getCategorias(usuario.loja)
	}

	componentDidMount() {
		this.getCategorias(this.props)
	}

	componentDidUpdate(prevProps) {
		
		if (!prevProps.usuario && this.props.usuario) this.getCategorias(this.props);
	}

	validate() {
		
		const { nome, descricao, categoria, preco, sku } = this.state;
		const erros = {};
		if (!nome) erros.nome = "Preencha com o nome do produto";
		if (!descricao) erros.descricao = 'Preencha com a descrição do produto';
		if (!categoria) erros.categoria = 'Preencha com a categoria do  produto';
		if (!preco) erros.preco = 'Preencha com o preço do produto';
		if (!sku) erros.sku = 'Preencha com o sku do produto';

		this.setState({ erros })
		return !(Object.keys(erros).length > 0);
	}

	salvarProduto() {
		const { usuario, salvarProduto } = this.props;
		if (!usuario) return null;
		if (!this.validate()) return null;
		salvarProduto(this.state, usuario.loja, (error) => {

			console.log(error)
			this.setState({ aviso: { status: !error, msg: error ? error.message : "produto criado com sucesso!" } })
		})

	}
	

	renderCabecalho() {
		const { nome } = this.state;
		return (
			<div className='flex'>
				<div className='flex-1 flex vertical'>
					<Titulo tipo='h1' titulo={nome || 'Novo Produto'} />
				</div>
				<div className='flex-1 flex-end'>
					<Button type='success' label='Salvar' onClick={() => this.salvarProduto()} />
				</div>
			</div>
		);
	}

	onChangeInput = (field,value) => this.setState({[field]: value}, ()=> this.validate())

	renderDados() {

		const { nome, descricao, categoria, preco, promocao, sku, erros, parcelado } = this.state;
		const { categorias } = this.props;

		return (
			<div className='Dados-Produto'>
				<InputSimples name='nome' label='Nome' value={nome} error={erros.nome} onChange={(ev) => this.onChangeInput('nome', ev.target.value)} />
				<br />
				<TextoDados
					chave='Categoria'
					valor={
						<InputSelect
							name='categoria'
							error={erros.categoria}
							onChange={(ev) => this.onChangeInput('categoria', ev.target.value)}
							value={categoria}
							opcoes={[{ label: 'Selecionar...', value: '' }, ...(categorias || []).map((item) => ({ label: item.nome, value: item._id }))]}
						/>
					}
				/>
				<br />
				<TextoDados
					chave='Descrição'
					vertical
					valor={
						<div>
							<textarea
								name={'descricao'}
								onChange={(ev) => this.onChangeInput('descricao', ev.target.value)}
								value={descricao}
								rows='10'
								style={{ resize: 'none' }}
							/>
							{erros.descricao && <small className='small-danger'>{erros.descricao}</small>}
						</div>
					}
				/>
				<InputSimples name='preco' label='Preço' type='number' value={preco} error={erros.preco} onChange={(ev) => this.onChangeInput('preco', ev.target.value)} />
				<InputSimples
					name='promocao'
					label='Preço em promoção'
					type='number'
					value={promocao}
					error={erros.promocao}
					onChange={(ev) => this.onChangeInput('promocao', ev.target.value)}
				/>

				<InputSimples name='sku' label='SKU' value={sku} error={erros.sku} onChange={(ev) => this.onChangeInput('sku', ev.target.value)} />
			</div>
		);
	
		
	}

	render() {

		return(
		<div className='Novo-Produto full-width'>
			<div className='Card'>
				<Voltar history={this.props.history} />
				{this.renderCabecalho()}
				<AlertGeral aviso={this.state.aviso} />
				<br />
				<div className='flex horizontal'>
					<div className='flex-1 flex vertical'>
						{this.renderDados()}
					</div>
					<div className='flex-1 flex vertical'></div>
				</div>
			</div>
		</div>)
	}
}

const mapStateToProps = state => ({
	produto: state.produto.produto,
	categorias: state.categoria.categorias,
	usuario: state.auth.usuario
})

export default connect(mapStateToProps, { ...actionsProdutos, ...actionsCategorias})(NovoProduto);
