/* Modulo 25  Clientes criando a estrutura da pagian de clientes */


import React, { Component } from 'react';
/*import moment from 'moment';*/
import Titulo from '../../components/Texto/Titulo';
import Pesquisa from '../../components/Inputs/Pesquisa';
import Tabela from '../../components/Tabela/Simples';
import Paginacao from '../../components/Paginacao/Simples';


/* Modulo 29 - Dashboard - integração clientes */
import { connect } from "react-redux";
import * as actions from '../../actions/clientes';

import { Link } from 'react-router-dom';

class Clientes extends Component {
	state = {
		pesquisa: '',
		atual: 0,
		limit: 5,
	};

	getClientes() {
		const { atual, limit, pesquisa } = this.state;
		const { usuario } = this.props;

		if (!usuario) return null;
		const loja = usuario.loja;

		if (pesquisa) this.props.getClientesPesquisa(pesquisa, atual, limit, loja);
		else this.props.getClientes(atual, limit, loja);
	}

	componentDidMount() {

			if (this.props.stateAtual) {
				this.setState({ ...this.props.stateAtual }, () => {
					this.props.limpaStateAtual();
					this.getClientes();
				})
			} else this.getClientes();
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.usuario && this.props.usuario) this.getClientes();
	}

	onChangePesquisa = (ev) => this.setState({ pesquisa: ev.target.value });

	changeNumeroAtual = (atual) => this.setState({ atual }, () => this.getClientes());

	handleSubmitPesquisa() {
		this.setState({ atual: 0 }, this.getClientes());
	}

	renderBotaoNovo() {
		return (
			<Link className='button button-success button-small' to='/clientes/novo'>
				<i className='fas fa-plus'></i>
				<span>&nbsp;Adicionar</span>
			</Link>
		);
	}

	gravarStateAtual() {
		this.props.setStateAtual(this.state);
	}

	render() {
		const { pesquisa } = this.state;

		const { clientes } = this.props;

		const dados = [];

		(clientes ? clientes.docs : []).forEach((item) => {
			dados.push({
				Cliente: item.nome,
				'E-mail': item.usuario ? item.usuario.email : '',
				Telefone: item.telefones[0],
				CPF: item.cpf,
				botaoDetalhes: `/cliente/${item._id}`,
			});
		});

		return (
			<div className='Clientes full-width'>
				<div className='Card'>
					<div className='flex'>
						<div className='flex-1 flex'>
							<Titulo tipo='h1' titulo='Clientes' />
						</div>
						<div className='flex-1 flex flex-end'>{this.renderBotaoNovo()}</div>
					</div>

					<br />
					<Pesquisa
						valor={pesquisa}
						placeholder={'Pesquise aqui pelo nome do cliente...'}
						onChange={(ev) => this.onChangePesquisa(ev)}
						onClick={() => this.handleSubmitPesquisa()}
					/>
					<br />
					<Tabela cabecalho={['Cliente', 'E-mail', 'Telefone', 'CPF']} dados={dados} onClick={() => this.gravarStateAtual()} />
					<Paginacao
						atual={this.state.atual}
						total={clientes ? clientes.total : 0}
						limite={this.state.limit}
						onClick={(numeroAtual) => this.changeNumeroAtual(numeroAtual)}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({	
	clientes: state.cliente.clientes,
	usuario: state.auth.usuario,
	stateAtual : state.cliente.stateAtual
})


export default connect(mapStateToProps,actions)(Clientes);