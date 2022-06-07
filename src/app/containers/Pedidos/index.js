/* 
 Modulo 21 - Dashboard - instalando o redux e preparando as pastas.
 instalando o sistema de rotas  e criando  o primeiro container  e componente.
*/

import React, { Component } from 'react';
import Titulo from '../../components/Texto/Titulo'
import Pesquisa from '../../components/Inputs/Pesquisa'

class Pedidos extends Component {
	
	state = {
		pesquisa: ""
	}

	onChangePesquisa = (ev) => this.setState({ pesquisa: ev.target.value });
	 

	render() {

		/*
		  Modulo 23 - Dashboard  Finalizando  tela de pedidos 1/3	
	   */
		const { pesquisa } = this.state;

		return (
			<div className='Pedidos'>
				<div className='card'>
					<Titulo tipo='h1' titulo='Pedidos' />
					<br />
					<Pesquisa
						valor={pesquisa}
						placeholder={"Pesquise aqui pelo nome do cliente..."}
						onChange={ (ev)=> this.onChangePesquisa(ev)} />
					
					<br />
					<Tabela />
					<Paginacao />
				</div>
			</div>
		);
	}
}

export default Pedidos;