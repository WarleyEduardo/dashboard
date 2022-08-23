/* Modulo 23 Detalhes do pedido 1/6 */

import React , {Component} from 'react'

/* Modulo 23 Detalhes do pedido 5/6 */

import Titulo from '../../components/Texto/Titulo';
import ListaDinamica from '../../components/Listas/ListaDinamicaSimples';
import InputValor from '../../components/Inputs/InputValor'


/* Modulo 28 Detalhes do pedido  colocando detalhes do pagamento e entrega */

import { connect } from 'react-redux';
import * as actions from '../../actions/pedidos';
import AlertGeral from '../../components/Alert/Geral';


class DetalhesDaEntrega extends Component {
	state = {
		aviso: null,
	};

	cleanState() {
		this.setState({ aviso: null });
	}

	onAddListaDinamica = (texto) => {
		this.cleanState();
		if (!texto) return this.setState({ aviso: { status: false, msg: 'Preenchar o campo para enviar um novo status' } });
		this.setNovoStatus(texto, undefined);
	};

	setNovoStatus = (status, codigoRastreamento) => {
		this.cleanState();
		const { pedido, usuario } = this.props;
		if (!usuario || !pedido) return false;
		this.props.setNovoStatusEntrega({ status, codigoRastreamento }, pedido.pedido.entrega._id, pedido.pedido._id, usuario.loja, (error) => {
			if (error) this.setState({ aviso: false, msg: error.message });
		});
	};

	handleSubmit = (value) => {
		if (!value) return this.setState({ aviso: { status: false, msg: 'Preenchar o código de rastreamento' } });
		this.setNovoStatus('Atualização no Cód. de rastreamento', value);
	};

	render() {
		const { pedido } = this.props;
		const { aviso } = this.state;

		if (!pedido) return <div></div>;
		const status = (pedido.registros || []).reduce((all, item) => (item.tipo === 'entrega' ? all.concat([item.situacao]) : all), []);

		if (status.length === 0) status.push('Sem dados de entrega');
		const { codigoRastreamento } = pedido.pedido.entrega;

		return (
			<div className='Detalhes-da-Entrega'>
				<Titulo tipo='h3' titulo='Entrega' />
				<AlertGeral aviso={aviso} />
				<br />
				<label>Código de Rastreamento</label>
				<InputValor value={codigoRastreamento} handleSubmit={(value) => this.handleSubmit(value)} name={'codigoDeRastreamento'} />
				<br />
				<ListaDinamica dados={status} onAdd={this.onAddListaDinamica} />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	
	pedido: state.pedido.pedido,
	usuario: state.auth.usuario
})

export default  connect(mapStateToProps,actions)(DetalhesDaEntrega);