/* Modulo 25  Categoria  2/2 */

import React, { Component } from 'react';
import Titulo from '../../components/Texto/Titulo';
//import Pesquisa from '../../components/Inputs/Pesquisa';
import Tabela from '../../components/Tabela/Simples';
import Paginacao from '../../components/Paginacao/Simples';

/* Modulo 30 - Detalhes da categoria
  criando lista de produtos
*/

import { connect } from 'react-redux'
import * as actions from '../../actions/categorias'


class listaDeProdutos extends Component {
	state = {
		//pesquisa: '',

		atual: 0,
		limit : 5
	};


	getCategoriaProdutos(props) {
		const { atual, limit } = this.state;
		const { usuario, categoria } = props;
		if (!usuario || !categoria) return null;

		this.props.getCategoriaProdutos(categoria._id, atual, limit, usuario.loja);

		
	}

	componentDidMount() {
		this.getCategoriaProdutos(this.props)
	}
	
	componentDidUpdate(prevProps) {
		
		if (

			(!prevProps.usuario && this.props.usuario) ||
			(!prevProps.categoria && this.props.categoria)
		) this.getCategoriaProdutos(this.props);
	}

	//onChangePesquisa = (ev) => this.setState({ pesquisa: ev.target.value });

	changeNumeroAtual = (atual) => this.setState({ atual },()=> this.getCategoriaProdutos(this.props));

	render() {
		//const { pesquisa } = this.state;

		const { categoriaProdutos } = this.props;

		const dados = [];

		(categoriaProdutos ? categoriaProdutos.docs : []).forEach(item => {			

			dados.push({
				"Produto": item.titulo,
				"SKU": item.sku,
				"Disponibilidade": item.disponibilidade ? "Disponível" : "Indisponível",
				"botaoDetalhes" : `/produto/${item._id}`
			})
			
		});
		

         /*
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
		*/

		return (
			<div className='ListDeProdutos'>
				<br/> <hr/>
				<Titulo tipo='h3' titulo='Produtos da Categoria' />
				<br />
				{/*
				<Pesquisa
					valor={pesquisa}
					placeholder={'Pesquise aqui pelo nome do produto ou descrição...'}
					onChange={(ev) => this.onChangePesquisa(ev)}
					onClick={() => alert('Pesquisar')}
				/>
				<br />
				*/}
				<Tabela cabecalho={['Produto', 'SKU', 'Disponibilidade']}
					dados={dados} />
				<Paginacao
					atual={this.state.atual}
					total={this.props.categoriaProdutos ? this.props.categoriaProdutos.total : 0} 
					limite={this.state.limit}
					onClick={(numeroAtual) => this.changeNumeroAtual(numeroAtual)} />
			</div>
		);
	}
}

const mapStateToProps = state => (
	{
		categoriaProdutos: state.categoria.categoriaProdutos,
		categoria: state.categoria.categoria,
		usuario: state.auth.usuario
	}
)

export default  connect(mapStateToProps,actions) (listaDeProdutos);