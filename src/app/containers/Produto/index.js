/* Modulo 25 preparando a base de produtos */
import React, { Component } from 'react';

import DetalhesProduto from './detalhesProduto';
import DetalhesVariacoes from './DetalhesVariacoes'

class Produto extends Component{

	render() {
	 

		return (
			
			<div className='Produto full-width flex vertical'>
				<div className='Card'>
                  <DetalhesProduto />
				</div>

				<div className='Card'>
					<DetalhesVariacoes />
					

				</div>
				
			</div>
		)
 }

}

export default Produto;