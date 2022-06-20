/* Modulo 23 Detalhes do pedido 1/6 */


/* Modulo 23 Detalhes do pedido 1/6 */

import React, { Component } from 'react'
import Titulo from '../../components/Texto/Titulo'
import ButtomSimples from '../../components/Button/Simples'

class DetalhesDoPedido extends Component {

	renderCabecalho() { 

		return (
			<div>
				<div>
					<div>
						<Titulo tipo='h2' titulo='Pedido - cliente 1 - 04/04/2019' />
					</div>
					<div>
						<ButtomSimples type='danger' label='CANCELAR PEDIDO' onClick={() => alert('Cancelado')} />
					</div>
				</div>
			</div>
		);

	}
	
	render() {
		return (
			<div className='Detalhes-do-Pedido'>

				{this.renderCabecalho()}

			</div>
		);

	}
}


export default DetalhesDoPedido;