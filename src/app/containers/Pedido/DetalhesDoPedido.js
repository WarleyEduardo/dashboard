/* Modulo 23 Detalhes do pedido 1/6 */



import React, { Component } from 'react'
import Titulo from '../../components/Texto/Titulo'
import ButtomSimples from '../../components/Button/Simples'

/* Modulo 23 Detalhes do pedido 2/6 */

import { TextoDados } from '../../components/Texto/Dados'
import TabelaSimples from '../../components/Tabela/Simples'


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

	renderDadosDoCliente() {
		return (
			<div>
				<Titulo tipo='h4' titulo='Dados do Cliente' />
				<br />
				<TextoDados chave='Nome' valor='Cliente 1' />
				<TextoDados chave='Cpf' valor='111.222.333.45' />
				<TextoDados chave='Telefone' valor='11 1234-5678' />
				<TextoDados chave='Data de nascimento' valor='10/04/1990' />
			</div>
		);
	}

	renderDadosDeEntrega() {
		return (
			<div>
				<Titulo tipo='h4' titulo='Dados de Entrega' />
				<br />
				<TextoDados chave='Endereco' valor='rua teste, 123' />
				<TextoDados chave='Bairro' valor='centro' />
				<TextoDados chave='Cidade' valor='Uberaba' />
				<TextoDados chave='Estado' valor='Minas Gerais' />
				<TextoDados chave='Cep' valor='38540-123' />
			</div>
		);
	}

	renderDadosDePagamento() {
		return (
			<div>
				<Titulo tipo='h4' titulo='Dados de Pagamento' />
				<br />
				<TextoDados chave='Taxa de Entrega' valor='R$ 15,50 (PAC)' />
				<TextoDados chave='Valor do Pedido' valor='R$ 32,00' />
				<TextoDados chave='Valor Total ' valor='R$ 47,50' />
				<TextoDados chave='Forma de Pagamento' valor='Boleto' />		
			</div>
		);
	}
	
	renderDadosDoCarrinho() {

		const dados = [
			{
				"Produto": 'Produto 1',
				'Preço Und.': 'R$ 12,00',
				'Quantidade': '1',
				'Preço Total': 'R$ 12,00',
			},
			{
				"Produto": 'Produto 2',
				'Preço Und.': 'R$ 10,00',
				'Quantidade': '2',
				'Preço Total': 'R$ 20,00',
			},
		]
		return (
			<div>
				<Titulo tipo="h4" titulo="Carrinho" />
				<br />
				<TabelaSimples cabecalho={["Produto", "Preço Und.", "Quantidade", "Preço Total"]}
					dados={dados}
				/>
			</div>
		)
	}

	render() {
		return (
			<div className='Detalhes-do-Pedido'>
				{this.renderCabecalho()}
				{this.renderDadosDoCliente()}
				{this.renderDadosDoCarrinho()}
				{this.renderDadosDeEntrega()}
				{this.renderDadosDePagamento()}
			</div>
		);
	}
}


export default DetalhesDoPedido;