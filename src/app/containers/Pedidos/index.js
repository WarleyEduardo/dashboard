/* 
 Modulo 21 - Dashboard - instalando o redux e preparando as pastas.
 instalando o sistema de rotas  e criando  o primeiro container  e componente.
*/

import React, { Component } from 'react';
import Titulo from '../../components/Texto/Titulo'
import Pesquisa from '../../components/Inputs/Pesquisa'
import moment from 'moment';

/*
  Modulo 23 - Dashboard  Finalizando  tela de pedidos 1/3	
*/

import Tabela from '../../components/Tabela/Simples';

class Pedidos extends Component {
	state = {
		pesquisa: '',
	};

	onChangePesquisa = (ev) => this.setState({ pesquisa: ev.target.value });

	/*
		  Modulo 23 - Dashboard  Finalizando  tela de pedidos 2/3	
	   */
	
	

	render() {
		const { pesquisa } = this.state;
		/*
		  Modulo 23 - Dashboard  Finalizando  tela de pedidos 1/3	
	   */
		
		const dados = [
			{
				Cliente: 'Cliente 1',
				'Valor Total': 89.9,
				Data: moment().toISOString(),
				Situação: 'Aguardando Pagamento',
				botaoDetalhes: '/pedido/9D1DS345FFD9',
			},
			{
				Cliente: 'Cliente 2',
				'Valor Total': 105.9,
				Data: moment().toISOString(),
				Situação: 'Aguardando Pagamento',
				botaoDetalhes: '/pedido/CCDDFS345DFD55',
			},
			{
				Cliente: 'Cliente 3',
				'Valor Total': 26.72,
				Data: moment().toISOString(),
				Situação: 'Pagamento Concluído',
				botaoDetalhes: '/pedido/834545DFDFDFDF',
			},
		];
		

		return (
			<div className='Pedidos'>
				<div className='card'>
					<Titulo tipo='h1' titulo='Pedidos' />
					<br />
					<Pesquisa valor={pesquisa} placeholder={'Pesquise aqui pelo nome do cliente...'} onChange={(ev) => this.onChangePesquisa(ev)} />

					<br />
					<Tabela cabecalho={['Cliente', 'Valor Total', 'Data', 'Situação']} dados={dados} />
					<Paginacao />
				</div>
			</div>
		);
	}
}

export default Pedidos;