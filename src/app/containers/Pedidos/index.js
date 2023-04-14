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

import { formatMoney } from '../../actions'

/*implementação warley  */

import InputSimples from '../../components/Inputs/Simples'

class Pedidos extends Component {
	state = {
		pesquisa: '',
		atual: 0,
		limit: 5,
		dtInicial:'',
		dtFinal: ''	
	};

	getPedidos() {
		const { atual, limit, pesquisa, dtInicial, dtFinal } = this.state;
		const { usuario } = this.props;
		if (!usuario) return null;
		const loja = usuario.loja;
		if (pesquisa) this.props.getPedidosPesquisa(pesquisa, atual, limit, loja)
		else if ((dtInicial && dtInicial !== '') && (dtFinal && dtFinal !== ''))
			this.props.getPedidosPorData(atual, limit, loja, dtInicial, dtFinal)		
		else this.props.getPedidos(atual, limit, loja);
	}

	/* Modulo 28 integração de pedidos */
	componentDidMount() {

					
		if (this.props.stateAtual) {
			this.setState({ ...this.props.stateAtual },
				() => {
					this.props.limpaStateAtual();
					this.getPedidos();
				});
		}    
		else		
		this.getPedidos();		
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.usuario && this.props.usuario) this.getPedidos();	
	}

	onChangePesquisa = (ev) => this.setState({ pesquisa: ev.target.value });

	/*
		  Modulo 23 - Dashboard  Finalizando  tela de pedidos 3/3	
	   */

	changeNumeroAtual = (atual) =>
		this.setState({ atual }, () => {
			this.getPedidos();
		});

	/* modulo 28 - Pedidos : criando a parte de pesquisa */

	handleSubmitPesquisa = () => {
		this.setState({ atual: 0 ,dtInicial : '', dtFinal : '' }, () => {
			this.getPedidos();
		});
	};

	getPedidosPorData() {
		
		const { atual, limit, dtInicial, dtFinal } = this.state;
		const { usuario } = this.props;
		if (!usuario) return null;		


			if (dtInicial === '' &&  dtFinal === '')
				this.setState({ atual: 0, dtInicial: '', dtFinal: '' }, () => {
					this.getPedidos();
				});



	  if (dtInicial === '' ||  dtFinal === '' || dtInicial.length < 10 || dtFinal.length < 10) {
		return null;
	 }	
		
	
		const loja = usuario.loja;

		this.setState({ atual: 0 , pesquisa : ''}, () => {
			this.props.getPedidosPorData(atual, limit, loja, dtInicial, dtFinal);
		});
		
	}

	onChange(field, value) {       

		this.setState({ [field]: value }, () => this.getPedidosPorData());
	}

	
	gravarStateAtual() {
		
		this.props.setStateAtual(this.state);
	}



	render() {
		const { pesquisa, dtInicial, dtFinal } = this.state;
		/*
		  Modulo 23 - Dashboard  Finalizando  tela de pedidos 1/3	
	   */

		/* Modulo 28 integração de pedidos */
		const { pedidos } = this.props;
		const dados = [];

		(pedidos ? pedidos.docs : []).forEach((item) => {
			dados.push({
				Cliente: item.cliente ? item.cliente.nome : '',
				'Valor Total': formatMoney(item.pagamento.valor),
				Data: moment(item.createdAt).format('DD/MM/YYYY'),
				Situação: item.pagamento.status !== 'Paga' ? item.pagamento.status : item.entrega.status,
				botaoDetalhes: `/pedido/${item._id}`
				
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
						onClick={() => this.handleSubmitPesquisa()}
					/>
					<br />
					<div className='filtro-data flex flex horizontal'>
						<InputSimples type='date' label='Inicial' value={dtInicial} onChange={(e) => this.onChange('dtInicial', e.target.value)} />

						<InputSimples type='date' label='Final' value={dtFinal} onChange={(e) => this.onChange('dtFinal', e.target.value)} />
					</div>
					<br />
					<Tabela
						cabecalho={['Cliente', 'Valor Total', 'Data', 'Situação']}
						dados={dados}
						onClick={() => this.gravarStateAtual()}
					/>

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
	usuario: state.auth.usuario,
	stateAtual : state.pedido.stateAtual
})

export default connect(mapStateToProps,actions)(Pedidos);