/* Modulo 25  Clientes 1/2 */

import React, { Component } from 'react';

import DetalhesDoCliente from './detalhesDoCliente';

import DetalhesDoPedido from './detalhesDoPedido';


class Cliente extends Component{ 

	render() {
		
		return (
		
			<div className='Cliente full-width flex vertical'>
				<div className='Card'>
				  <DetalhesDoCliente/>	
				</div>
				
				<div className='Sub-Card'>
						<DetalhesDoPedido />
				</div>
				
			</div>
		)

	}
	

}

export default Cliente;