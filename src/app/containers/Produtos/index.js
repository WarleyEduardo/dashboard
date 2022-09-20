/* Modulo 25 criando pagina de produtos */

import React, { Component } from 'react';
import Titulo from '../../components/Texto/Titulo';
import Pesquisa from '../../components/Inputs/Pesquisa';
import Tabela from '../../components/Tabela/Simples2';
import Paginacao from '../../components/Paginacao/Simples';

/* modulo 31 - produtos - preparando actions e reducer */

import * as actions from '../../actions/produtos'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Produtos extends Component {
	state = {
		pesquisa: '',
		atual: 0,
		limit: 5,
		ordem: 'alfabetica_a_z',
	};

	getProdutos(props) {
		const { atual, limit, pesquisa, ordem } = this.state;
		const { usuario } = props;

		if (!usuario) return null;
		if (pesquisa) props.getProdutosPesquisa(pesquisa, ordem, atual, limit, usuario.loja);
		else props.getProdutos(ordem, atual, limit, usuario.loja);
	}

	componentWillMount() {
		this.getProdutos(this.props);
	}

	componentWillUpdate(nextProps) {
		if (!this.props.usuario && nextProps.usuario) this.getProdutos(nextProps);
	}

	handleSubmitPesquisa() {
		this.setState({ atual: 0 }, () => {
			this.getProdutos(this.props);
		});
	}

	onChangePesquisa = (ev) => this.setState({ pesquisa: ev.target.value });

	changeNumeroAtual = (atual) => this.setState({ atual }, () => this.getProdutos(this.props));

	changeOrdem = (ev) => this.setState({ ordem: ev.target.value }, () => this.getProdutos(this.props));


	renderBotaoNovo = () => {
		return (
			<Link className=" button button-success  button-small"
				to="/produtos/novo">
				<i className='fas fa-plus'></i>
				<span>&nbsp;Adicionar</span>
			</Link> 
		)
	}

	render() {
		const { pesquisa, ordem } = this.state; 

		const { produtos } = this.props;

		const dados = [];
		(produtos ? produtos.docs : []).forEach(item => {

			dados.push({
				"Produto": item.titulo,
				"Categoria": item.categoria? item.categoria.nome : "" ,
				"Disponível": (item.disponibilidade ? 'sim': "não"),
				"botaoDetalhes": `/produto/${item._id}`,
			});
			
		});

		return (
			<div className='Produtos full-width'>
				<div className='Card'>
					<div className='flex'>
						<div className='flex flex-1'>
							<Titulo tipo='h1' titulo='Produtos' />
						</div>
						<div className='flex flex-1 flex-end'>
							{this.renderBotaoNovo()}
						</div>
					</div>
					<div className='flex'>
						<div className='flex-3'>
							<Pesquisa
								valor={pesquisa}
								placeholder={'Pesquise aqui pelo nome do produtos, descrição ou categoria...'}
								onChange={(ev) => this.onChangePesquisa(ev)}
								onClick={() => this.handleSubmitPesquisa()}
							/>
						</div>
						<div className='flex-1 flex vertical'>
							<label>
								<small>Ordernar por</small>
							</label>
							<select value={ordem} onChange={this.changeOrdem}>
								<option>Aleatório</option>
								<option value={'alfabetica_a-z'}>Alfabética A-Z</option>
								<option value={'alfabetica_z-a'}>Alfabética Z-A</option>
								<option value={'preco-crescente'}>Preço menor</option>
								<option value={'preco-decrescente'}>Preço maior</option>
							</select>
						</div>
					</div>

					<br />
					<Tabela cabecalho={['Produto', 'Categoria', 'Disponível', '*Exibir']} dados={dados} />
					<Paginacao
						atual={this.state.atual}
						total={this.props.produtos ? this.props.produtos.total : 0}
						limite={this.state.limit}
						onClick={(numeroAtual) => this.changeNumeroAtual(numeroAtual)}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	
	produtos: state.produto.produtos,
	usuario: state.auth.usuario
})

export default connect(mapStateToProps,actions)(Produtos);