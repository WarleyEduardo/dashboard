/* Modulo 23 Detalhes do pedido 1/6 */

/* Modulo 23 Detalhes do pedido 1/6 */

import React, { Component } from 'react'

/* Modulo 23 Detalhes do pedido 3/6 */

import Titulo from '../../components/Texto/Titulo'
import ListaDinamica from '../../components/Listas/ListaDinamicaSimples';


/* Modulo 28 Detalhes do pedido  colocando detalhes do pagamento e entrega */
import { connect } from 'react-redux';
import * as actions from '../../actions/pedidos';
import AlertGeral from '../../components/Alert/Geral';



class DetalhesDoPagamento extends Component {
	state = {
		aviso: null
	}


	cleanState() {
		this.setState({aviso: null})
	}


	onAddListaDinamica = (texto) => {

		this.cleanState();
		
		if (!texto) return this.setState({ aviso: { status: false, msg: "Preenchar o campo para enviar um novo status" } });
		const { pedido, usuario } = this.props;
		this.props.setNovoStatusPagamento(texto, pedido.pedido.pagamento._id, pedido.pedido._id, usuario.loja, error => {
			
		if (error) this.setState({ aviso: { status: false, msg: error.message } });
		})
		 
	}
	

	render() {
 
		const { pedido } = this.props;
		const { aviso } = this.state;

		if (!pedido) return <div></div>;
		const status = (pedido.registros || [])
			.reduce((all, item) => item.tipo === 'pagamento' ? all.concat([item.situacao]) : all, [])	
			
		if (status.length === 0) status.push('Sem dados de pagamento') 
		
		return (
			<div className='Detalhes-do-Pagamento'>
				<Titulo tipo="h3" titulo="Pagamento" />
				<AlertGeral aviso={aviso}/>
				<br />
				<ListaDinamica
					dados={status}
					onAdd={this.onAddListaDinamica}/>
			</div>
		)

	}
}

const mapStateToProps = state => ({
	
	pedido: state.pedido.pedido,
	usuario: state.auth.usuario
})

export default connect(mapStateToProps, actions)(DetalhesDoPagamento);
