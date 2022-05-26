/* 
 Modulo 21 - Dashboard - instalando o redux e preparando as pastas.
 instalando o sistema de rotas  e criando  o primeiro container  e componente.
*/

import React, { Component } from 'react';
import Titulo  from '../../components/Texto/Titulo'

class Pedidos extends Component {	

	render() {
		
		return (
			<div className='Pedidos'>
				<Titulo tipo="h1" titulo="Pedidos"/>
			
		</div>)
	}
}

export default Pedidos;