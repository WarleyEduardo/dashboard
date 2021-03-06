/* Modulo 23 Detalhes do pedido 1/6 */

/* Modulo 23 Detalhes do pedido 1/6 */

import React, { Component } from 'react'

/* Modulo 23 Detalhes do pedido 3/6 */

import Titulo from '../../components/Texto/Titulo'
import ListaDinamica from '../../components/Listas/ListaDinamicaSimples';

class DetalhesDoPagamento extends Component {
	state = {
		status: ["Aguardando Pagamento",
			     "Processando Pagamento"]
	}


	onAddListaDinamica = (texto) => {
		if (!texto) return false;
		let { status } = this.state;
		status.push(texto)
		this.setState({ status });
		 
	}

	render() {

		const { status } = this.state;
		
		return (
			<div className='Detalhes-do-Pagamento'>
				<Titulo tipo="h3" titulo="Pagamento" />
				<br />
				<ListaDinamica
					dados={status}
					onAdd={this.onAddListaDinamica}/>
			</div>
		)

	}
}

export default DetalhesDoPagamento;