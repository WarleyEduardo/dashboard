/*modulo 25  criando estrutura de categorias*/

import React, { Component } from 'react';
import Titulo from '../../components/Texto/Titulo';
import Tabela from '../../components/Tabela/Simples';

/* modulo 30 - Categorias
  preparando pagina de categorias e botão novo
*/
import { connect } from 'react-redux';
import * as actions from '../../actions/categorias';

import {Link} from 'react-router-dom'

class Categorias extends Component {

	getCategorias() {		
		const { usuario } = this.props;

		if (!usuario) return null;

		this.props.getCategorias(usuario.loja);
	}

	componentWillMount() {
		this.getCategorias();
	} 

	componentDidUpdate(prevProps) {
		if (!prevProps.usuario && this.props.usuario) this.getCategorias();
	}

	renderBotaoNovo() {
		return (
			<Link className="button button-success button-small"
			 to="/categoria/nova"
			>
				<i className='fas fa-plus'></i>
			<span>&nbsp;Nova Categoria</span>	
			</Link>
		)
	}
	
	render() {		

		const { categorias } = this.props;

		if (!categorias) return <div></div>
        
		const dados = [];
	
		(categorias || [] ).forEach(item => {

			dados.push({
				Categoria: item.nome,
				'Qtd. de Produtos': `${item.produtos ?  item.produtos.length : 0}`,
				botaoDetalhes: `categoria/${item._id}`,
			});
			
		});       

   
		return (
			<div className='Categorias full-width'>
				<div className='Card'>
					<Titulo tipo='h1' titulo='Categoria' />	
					<br />
					{ this.renderBotaoNovo()}
					<br/><br/>
					<Tabela cabecalho={['Categoria', 'Qtd. de Produtos']} dados={dados} />					
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	usuario: state.auth.usuario,
	categorias: state.categoria.categorias,
});

export default connect(mapStateToProps, actions)(Categorias);