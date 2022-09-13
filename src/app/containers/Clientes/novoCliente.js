import React, { Component } from 'react';
import Titulo from '../../components/Texto/Titulo';
import ButtonSimples from '../../components/Button/Simples';
import InputSimples from '../../components/Inputs/Simples';
import Voltar from '../../components/Links/Voltar';
import { connect } from 'react-redux';
import * as actions from '../../actions/clientes';
import AlertGeral from '../../components/Alert/Geral';

import ListaDinamicaSimples from '../../components/Listas/ListaDinamicaSimples';


class NovoCliente extends Component {
	state = {
		nome: '',
		cpf: '',
		telefones: [],
		dataDeNascimento: '',
		email: '',
		local: '',
		numero: '',
		bairro: '',
		complemento :'',
		cidade: '',
		estado: '',
		password : '',
		cep: '',
		aviso: null,
		avisoTelefone: null,
		erros: {},
	};

	clearAlert = () => this.setState({ aviso: null });

	validate = () => {
		const { nome } = this.state;
		const erros = {};
		if (!nome) erros.nome = 'Preencha aqui com o nome do cliente';

		this.setState({ erros });
		return !(Object.keys(erros).length > 0);
	};

	onChangeInput = (field, value) => this.setState({ [field]: value }, () => this.validate());

	salvarCliente() {
		const { usuario } = this.props;
		if (!usuario) return null;
		if (!this.validate()) return null;
		this.props.salvarCliente(this.state, usuario.loja, (error) => {
			this.setState({
				aviso: { status: !error, msg: error ? error.message : 'Cliente adicionado com sucesso!' },
			});
		});
	}

	renderCabecalho() {
		const { nome } = this.state;
		return (
			<div className='flex'>
				<div className='flex-1 flex'>
					<Titulo tipo='h1' titulo={nome || 'Novo Cliente'} />
				</div>
				<div className='flex-1 flex flex-end'>
					<ButtonSimples onClick={() => this.salvarCliente()} type='success' label='Salvar' />
				</div>
			</div>
		);
	}

	renderDetalhesCadastro() {
		const { nome, cpf, email, dataDeNascimento, password, erros } = this.state;

		return (
			<div className='Detalhes-do-Cadastro'>
				<Titulo tipo='h3' titulo='Dados' />
				<br />
				<div>
					<InputSimples name='nome' label='Nome' value={nome} erro={erros.nome} onChange={(ev) => this.onChangeInput('nome', ev.target.value)} />
				</div>

				<div className='flex horizontal'>
					<div>
						<InputSimples name='cpf' label='CPF' value={cpf} erro={erros.cpf} onChange={(ev) => this.onChangeInput('cpf', ev.target.value)} />

						<InputSimples name='email' label='E-mail' value={email} erro={erros.email} onChange={(ev) => this.onChangeInput('email', ev.target.value)} />

						<InputSimples
							name='dataDeNascimento'
							label='Nascimento'
							value={dataDeNascimento}
							erro={erros.dataDeNascimento}
							onChange={(ev) => this.onChangeInput('dataDeNascimento', ev.target.value)}
						/>

						<InputSimples
							type='password'
							name='password'
							label='Senha'
							value={password}
							erro={erros.password}
							onChange={(ev) => this.onChangeInput('password', ev.target.value)}
						/>
					</div>
				</div>
			</div>
		);
	}

	renderEndereco() {
		const { local, numero, bairro,complemento ,cidade, estado, cep, erros } = this.state;

		return (
			<div className='Endereco-cliente flex-1'>
				<Titulo tipo='h3' titulo='Endereço' />
				<br />
				<InputSimples name='local' label='Logradouro' value={local} erro={erros.local} onChange={(ev) => this.onChangeInput('local', ev.target.value)} />
				<InputSimples name='numero' label='Número' value={numero} erro={erros.numero} onChange={(ev) => this.onChangeInput('numero', ev.target.value)} />
				<InputSimples name='bairro' label='Bairro' value={bairro} erro={erros.bairro} onChange={(ev) => this.onChangeInput('bairro', ev.target.value)} />
				<InputSimples name='complemento'
					label='Complemento'
					value={complemento}
					erro={erros.complemento}
					onChange={(ev) => this.onChangeInput('complemento', ev.target.value)} />

				<InputSimples name='cidade' label='Cidade' value={cidade} erro={erros.cidade} onChange={(ev) => this.onChangeInput('cidade', ev.target.value)} />
				<InputSimples name='estado' label='Estado' value={estado} erro={erros.estado} onChange={(ev) => this.onChangeInput('estado', ev.target.value)} />
				<InputSimples name='cep' label='Cep' value={cep} erro={erros.cep} onChange={(ev) => this.onChangeInput('cep', ev.target.value)} />
			</div>
		);
	}

	onAdd = (valor) => {
		this.clearAlert();
		if (!valor) return this.setState({ avisoTelefone: { status: false, msg: 'Preenchar o campo para enviar um novo telefone' } });

		const { telefones } = this.state;
		this.setState({ telefones: [...telefones, valor] });
	};

	onRemove = (idx) => {
		if (idx < 0) return;

		const { telefones } = this.state;
		telefones.splice(idx, 1);
		this.setState({ telefones: [...telefones] });		
	};

	renderTelefones() {
		const { telefones } = this.state;

		return (
			<div className='Telefones-cliente flex-1'>
				<Titulo tipo='h3' titulo='Telefones' />
				<br />
				<AlertGeral aviso={this.state.avisoTelefone} />
				<ListaDinamicaSimples dados={telefones} onAdd={this.onAdd} onRemove={this.onRemove} />
			</div>
		);
	}

	render() {
		return (
			<div className='Novo-Cliente full-width'>
				<div className='Card'>
					<Voltar history={this.props.history} />
					<AlertGeral aviso={this.state.aviso} />
					{this.renderCabecalho()}
					<div>
						{this.renderDetalhesCadastro()}
						<div className='flex horizontal'>
							{this.renderEndereco()}
						    {this.renderTelefones()}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({ usuario: state.auth.usuario });

export default connect(mapStateToProps, actions)(NovoCliente);