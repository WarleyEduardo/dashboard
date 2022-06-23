/* Modulo 23 Detalhes do pedido 1/6 */

import React , {Component} from 'react'

/* Modulo 23 Detalhes do pedido 5/6 */

import Titulo from '../../components/Texto/Titulo';
import ListaDinamica from '../../components/Listas/ListaDinamicaSimples';
import InputValor from '../../components/Inputs/InputValor'

class DetalhesDaEntrega extends Component {
	
	
	state = {
		status: ['Preparando para Envio', 'Entregue a Transportadora', 'Em Transito'],

        codigoDeRastreamento : "PA12345678912BR"  

	};

	 onAddListaDinamica = (texto) => {
		if (!texto) return false;
		let { status } = this.state;
		status.push(texto)
		this.setState({ status });
		 
	}
	

	handleSubmit = (value) => {
		this.setState({codigoDeRastreamento :value})
		alert('SALVO')
	}
	

	render() {
		const { status , codigoDeRastreamento } = this.state;

		return (
			<div className='Detalhes-da-Entrega'>
				<Titulo tipo='h4' titulo='Entrega' />
				<br />
				<label>Código de Rastreamento</label>
				<InputValor value={codigoDeRastreamento}
					handleSubmit={(value) => this.handleSubmit(value)}
					name={"codigoDeRastreamento"}
				/>
				<br />
				<ListaDinamica dados={status} onAdd={this.onAddListaDinamica} />
			</div>
		);
	}
}


export default DetalhesDaEntrega;