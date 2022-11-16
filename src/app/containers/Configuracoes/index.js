/* modulo  25 configurações da loja */

import React from 'react';
import ButtonSimples from '../../components/Button/Simples';
import { TextoDados } from '../../components/Texto/Dados';
import Titulo from '../../components/Texto/Titulo';
import InputValor from '../../components/Inputs/InputValor';
import ListaDinamicaSimples from '../../components/Listas/ListaDinamicaSimples';

import { connect } from 'react-redux'
import * as actions from '../../actions/configuracoes'
import AlertGeral from '../../components/Alert/Geral';

class Configuracoes extends React.Component {
	generateStateConfiguracao = (props) => ({
		nome: props.loja ? props.loja.nome : '',
		CNPJ: props.loja ? props.loja.cnpj : '',
		email: props.loja ? props.loja.email : '',
		endereco: props.loja ? props.loja.endereco.local : '',
		numero: props.loja ? props.loja.endereco.numero : '',
		bairro: props.loja ? props.loja.endereco.bairro : '',
		complemento: props.loja ? props.loja.endereco.complemento : '',
		cidade: props.loja ? props.loja.endereco.cidade : '',
		estado: props.loja ? props.loja.endereco.estado : '',
		cep: props.loja ? props.loja.endereco.CEP : '',
		telefones: props.loja ? props.loja.telefones : [],
		aviso: null,
		avisoTelefone: null,
		erros: {},
	});

	state = {
		...this.generateStateConfiguracao(this.props),
		aviso: null,
		erros: {},
	};

	getConfiguracao(props) {
		const { usuario } = props;
		if (!usuario) return null;
		this.props.getConfiguracao(usuario.loja);
	}

	componentDidMount() {
		this.getConfiguracao(this.props);
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.usuario && this.props.usuario) this.getConfiguracao(this.props);
		if (!prevProps.loja && this.props.loja) this.setState(this.generateStateConfiguracao(this.props));
	}

	updateLoja() {
		const { usuario } = this.props;
		if (!usuario || !this.validate()) return null;

		
		this.props.updateConfiguracao(this.state, usuario.loja, (error) => {
			this.setState({
				aviso: {
					status: !error,
					msg: error ? error.message : 'configuração da loja atualizada com sucesso!'
				},
			});  
		});
	}

	clearAlert = () => this.setState({ aviso: null });

	validate() {
		const { nome, CNPJ, email, endereco, numero, bairro, cidade, estado, cep } = this.state;

		const erros = {};

		if (!nome) erros.nome = 'Preencha aqui com o nome da loja';
		if (!CNPJ) erros.CNPJ = 'Preencha aqui com o CNPJ da loja';
		if (!email) erros.email = 'Preencha aqui com o email da loja';
		if (!endereco) erros.endereco = 'Preencha aqui com o endereço da loja';
		if (!numero) erros.numero = 'Preencha aqui com o número da loja';
		if (!bairro) erros.bairro = 'Preencha aqui com o bairro da loja';
		if (!cidade) erros.cidade = 'Preencha aqui com o cidade da loja';
		if (!estado) erros.estado = 'Preencha aqui com o estado da loja';
		if (!cep) erros.cep = 'Preencha aqui com o cep da loja';

		this.setState({ erros });

		return !(Object.keys(erros).length > 0);
	}

	handleSubmit = (field, value) => {
		this.setState({ [field]: value }, () => this.validate());
	};

	renderCabecalho() {
		return (
			<div className='flex'>
				<div className='flex-1 flex'>
					<Titulo tipo='h1' titulo='Configurações' />
				</div>
				<div className='flex-1 flex flex-end'>
					<ButtonSimples type='success' label='Salvar' onClick={() => this.updateLoja()} />
				</div>
			</div>
		);
	}

	renderDadosConfiguracao() {
		const { nome, CNPJ, email, erros } = this.state;

		return (
			<div className='dados-configuracao'>
				<TextoDados chave='Nome' valor={<InputValor noStyle erro={erros.nome} value={nome} name='nome' handleSubmit={(valor) => this.handleSubmit('nome', valor)} />} />

				<TextoDados chave='Cnpj' valor={<InputValor noStyle value={CNPJ} erro={erros.CNPJ} name='cnpj' handleSubmit={(valor) => this.handleSubmit('CNPJ', valor)} />} />

				<TextoDados
					chave='E-mail'
					valor={<InputValor noStyle erro={erros.email} value={email} name='email' handleSubmit={(valor) => this.handleSubmit('email', valor)} />}
				/>
			</div>
		);
	}

	renderDadosEndereco() {
		const { endereco, bairro, numero, complemento, cidade, estado, cep, erros } = this.state;

		return (
			<div className='dados-endereco'>
				<TextoDados
					chave='Endereço'
					valor={<InputValor noStyle erro={erros.endereco} value={endereco} name='endereco' handleSubmit={(valor) => this.handleSubmit('endereco', valor)} />}
				/>

				<TextoDados
					chave='Número'
					valor={<InputValor noStyle erro={erros.numero} value={numero} name='numero' handleSubmit={(valor) => this.handleSubmit('numero', valor)} />}
				/>

				<TextoDados
					chave='Bairro'
					valor={<InputValor noStyle erro={erros.bairro} value={bairro} name='bairro' handleSubmit={(valor) => this.handleSubmit('bairro', valor)} />}
				/>

				<TextoDados
					chave='Complemento'
					valor={<InputValor noStyle value={complemento} name='complemento' handleSubmit={(valor) => this.handleSubmit('complemento', valor)} />}
				/>

				<TextoDados
					chave='Cidade'
					valor={<InputValor noStyle erro={erros.cidade} value={cidade} name='cidade' handleSubmit={(valor) => this.handleSubmit('cidade', valor)} />}
				/>

				<TextoDados
					chave='Estado'
					valor={<InputValor noStyle erro={erros.estado} value={estado} name='estado' handleSubmit={(valor) => this.handleSubmit('estado', valor)} />}
				/>

				<TextoDados chave='Cep' valor={<InputValor noStyle erro={erros.CEP} value={cep} name='cep' handleSubmit={(valor) => this.handleSubmit('cep', valor)} />} />
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
		if (idx === undefined) return;

		const { telefones } = this.state;
		telefones.splice(idx, 1);
		this.setState({ telefones: [...telefones] });
	};

	renderTelefones() {
		const { telefones } = this.state;
		return (
			<div className='dados-telefones'>
				<Titulo tipo='h3' titulo='Telefones' />
				<br />
				<AlertGeral aviso={this.state.avisoTelefone} />
				<ListaDinamicaSimples dados={telefones} onAdd={this.onAdd} onRemove={this.onRemove} />
			</div>
		);
	}

	render() {
		return (
			<div className='Configuracoes full-width'>
				<div className='Card'>
					<AlertGeral aviso={this.state.aviso} />
					{this.renderCabecalho()}
					<div className='flex horizontal'>
						<div className='flex-1'>{this.renderDadosConfiguracao()}</div>
					</div>
					<br /> <hr /> <br />
					<div className='flex horizontal'>
						<div className='flex-1'>{this.renderDadosEndereco()}</div>

						<div className='flex-1'>{this.renderTelefones()}</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({

	usuario: state.auth.usuario,
	loja : state.configuracao.loja
})

export default connect(mapStateToProps,actions)(Configuracoes);
