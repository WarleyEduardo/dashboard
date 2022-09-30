/* Modulo 25  Avaliações */


import React, { Component } from 'react';
import Titulo from '../../components/Texto/Titulo';
import Tabela from '../../components/Tabela/Simples';
import moment from 'moment';
import Voltar from '../../components/Links/Voltar';

/* modulo 33 - integração avaliações - detalhes da avaliação*/
import { connect } from 'react-redux'
import * as actions from '../../actions/avaliacoes'


class Avaliacoes extends Component {


	getAvaliacoes(props) {
		
		const { usuario, produto } = props;
		if (!usuario || !produto) return null;
		this.props.getAvaliacoes(produto._id, usuario.loja);	
	}

	componentDidMount() {
		
		this.getAvaliacoes(this.props);
	}

	componentDidUpdate(prevProps) {
		
		if (
			(!prevProps.usuario || !prevProps.produto) &&
			(this.props.usuario && this.props.produto)
		)this.getAvaliacoes(this.props)
	 }
	

	render() {

		const { avaliacoes, produto } = this.props;
		const dados = [];
		(avaliacoes || []).forEach((item) => {
			
			dados.push({
				"Cliente": item.nome,
				"Data": moment(item.createdAt).format("DD/MM/YYYY"),		
				"botaoDetalhes": `/avaliacao/${item._id}`

			})
		})
	
		

		return (
			<div className='Avaliacoes full-width'>
				<div className='Card'>
					<Voltar path={`/produto/${produto._id}`} />
					<Titulo tipo='h1' titulo={`Avaliações - ${produto ? produto.titulo : ""}`} />
					<br />
					<Tabela cabecalho={['Cliente', 'Data']} dados={dados} />
				</div>
			</div>
		);
	}
}

const mapStateToPros = (state) => ({

	avaliacoes: state.avaliacao.avaliacoes,
	usuario: state.auth.usuario,
	produto : state.produto.produto
})

export default connect(mapStateToPros,actions)(Avaliacoes);