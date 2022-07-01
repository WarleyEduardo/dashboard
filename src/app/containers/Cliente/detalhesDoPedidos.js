/* modulo 25 -  clientes  2/2 */


import React, { Component } from 'react';
import moment from 'moment';
import Titulo from '../../components/Texto/Titulo'
import Tabela from '../../components/Tabela/Simples';

class DetalhesDosPedidos extends Component {
	render()
	 {
	
		const dados = [
			{
				"ID": 'csadfadf45555',
				"Valor Total": 89.9,
				"Data": moment().toISOString(),
				"Situação": 'Aguardando Pagamento',
				"botaoDetalhes": '/pedido/csadfadf45555',
			},
			{
				"ID": 'CCDDFS345DFD55',
				'Valor Total': 105.9,
				"Data": moment().toISOString(),
				"Situação": 'Aguardando Pagamento',
				"botaoDetalhes": '/pedido/CCDDFS345DFD55',
			},
			{
				"ID": '834545DFDFDFD',
				"Valor Total": 26.72,
				"Data": moment().toISOString(),
				"Situação": 'Pagamento Concluído',
				"botaoDetalhes": '/pedido/834545DFDFDFDF',
			},
		];

		return (
			<div className='Detalhes-dos-Pedidos'>
				<Titulo tipo='h3' titulo='Pedidos Feitos' />
				<br />
				<Tabela cabecalho={['ID', 'Valor Total', 'Data', 'Situação']} dados={dados} />					
			</div>
		);
	}
}

export default DetalhesDosPedidos;