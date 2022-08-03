/* 
 Modulo 21 - Dashboard - instalando o redux e preparando as pastas.
 instalando o sistema de rotas  e criando  o primeiro container  e componente.
*/

import React, { Component } from 'react';
import moment from 'moment';

import Titulo from '../../components/Texto/Titulo'
import Pesquisa from '../../components/Inputs/Pesquisa'

/*
  Modulo 23 - Dashboard  Finalizando  tela de pedidos 2/3	
*/

import Tabela from '../../components/Tabela/Simples';


/*
  Modulo 23 - Dashboard  Finalizando  tela de pedidos 3/3	
*/

import Paginacao from '../../components/Paginacao/Simples'


/* Modulo 28 integração de pedidos */
import * as actions from '../../actions/pedidos'
import { connect } from 'react-redux';

import {formatMoney} from '../../actions'

class Pedidos extends Component {
	state = {
		pesquisa: '',
		atual: 0,
		limit: 5,
	};

	getPedidos() {
		const { atual, limit } = this.state;
		const { usuario } = this.props;
		if (!usuario) return null;
		const loja = usuario.loja;
		this.props.getPedidos(atual, limit, loja); 
	}

	/* Modulo 28 integração de pedidos */
	componentWillMount() {
		this.getPedidos();
	}

	componentWillUpdate(nextProps) {
		if (!this.props.usuario && nextProps.usuario) this.getPedidos();
	}

	onChangePesquisa = (ev) => this.setState({ pesquisa: ev.target.value });

	/*
		  Modulo 23 - Dashboard  Finalizando  tela de pedidos 3/3	
	   */

	changeNumeroAtual = (atual) =>
		this.setState({ atual }, () => {
			this.getPedidos();
		});

	render() {
		const { pesquisa } = this.state;
		/*
		  Modulo 23 - Dashboard  Finalizando  tela de pedidos 1/3	
	   */

		/* Modulo 28 integração de pedidos */
		const { pedidos } = this.props;
		const dados = [];
			  
		(pedidos ? pedidos.docs : []).forEach((item) => {
					dados.push({
						"Cliente": item.cliente ? item.cliente.nome : '',
						'Valor Total': formatMoney(item.pagamento.valor),
						"Data": moment(item.createdAt).format('DD/MM/YYYY'),
						"Situação": item.pagamento.status !== 'Paga' ? item.pagamento.status : item.entrega.status,
						"botaoDetalhes": `/pedido/${item._id}`,
					});
				});	

		return (
			<div className='Pedidos full-width'>
				<div className='Card'>
					<Titulo tipo='h1' titulo='Pedidos' />
					<br />
					<Pesquisa
						valor={pesquisa}
						placeholder={'Pesquise aqui pelo nome do cliente...'}
						onChange={(ev) => this.onChangePesquisa(ev)}
						onClick={() => alert('Pesquisar')}
					/>
					<br />
					<Tabela cabecalho={['Cliente', 'Valor Total', 'Data', 'Situação']} dados={dados} />
					<Paginacao
						atual={this.state.atual}
						total={this.props.pedidos ? this.props.pedidos.total : 0}
						limite={this.state.limit}
						onClick={(numeroAtual) => this.changeNumeroAtual(numeroAtual)}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	
	pedidos: state.pedido.pedidos,
	usuario: state.auth.usuario
})

export default connect(mapStateToProps,actions)(Pedidos);