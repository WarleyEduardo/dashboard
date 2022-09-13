/* modulo  25 configurações da loja */

import React from 'react';
import ButtonSimples from '../../components/Button/Simples';
import { TextoDados } from '../../components/Texto/Dados';
import Titulo from '../../components/Texto/Titulo';
import InputValor from '../../components/Inputs/InputValor';
import ListaDinamicaSimples from '../../components/Listas/ListaDinamicaSimples';

import { connect } from 'react-redux'
import * as actions from '../../actions/loja'
import AlertGeral from '../../components/Alert/Geral';

class Configuracoes extends React.Component {
	generateStateLoja = (props) => ({
		nome: props.loja ? props.loja.nome : '',
		cnpj: props.loja ? props.loja.cnpj : '',
		email: props.loja ? props.loja.email : '',
		local: props.loja ? props.loja.endereco.local : '',
		numero: props.loja ? props.loja.endereco.numero : '',
		bairro: props.loja ? props.loja.endereco.bairro : '',
		complemento: props.loja ? props.loja.endereco.complemento : '',
		cidade: props.loja ? props.loja.endereco.cidade : '',
		estado: props.loja ? props.loja.endereco.estado : '',
		CEP: props.loja ? props.loja.endereco.CEP : '',
		telefones: props.loja ? props.loja.telefones : [],
		aviso: null,
		avisoTelefone: null,
		erros: {},
	});

	constructor(props) {
		super();
		this.state = {
			...this.generateStateLoja(props),
		};
	}

	componentDidMount() {
		const { usuario } = this.props;
		if (!usuario) return null;
		this.props.getLoja(usuario.loja);
		this.setState(this.generateStateLoja(this.props));
	}

	componentDidUpdate(prevProps) {
		if ((!prevProps.loja && this.props.loja) || (prevProps.loja && this.props.loja && prevProps.loja.updateAt !== this.props.loja.updateAt))
			this.setState(this.generateStateLoja(this.props));
	}

	clearAlert = () => this.setState({ aviso: null });

	validate() {
		const { nome, cnpj, email, local, numero, bairro, cidade, estado, CEP } = this.state;

		const erros = {};

		if (!nome) erros.nome = 'Preencha aqui com o nome da loja';
		if (!cnpj) erros.cnpj = 'Preencha aqui com o cnpj da loja';
		if (!email) erros.email = 'Preencha aqui com o email da loja';
		if (!local) erros.local = 'Preencha aqui com o endereço da loja';
		if (!numero) erros.numero = 'Preencha aqui com o número da loja';
		if (!bairro) erros.bairro = 'Preencha aqui com o bairro da loja';
		if (!cidade) erros.cidade = 'Preencha aqui com o cidade da loja';
		if (!estado) erros.estado = 'Preencha aqui com o estado da loja';
		if (!CEP) erros.CEP = 'Preencha aqui com o cep da loja';

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
					<ButtonSimples type='success' label='Salvar' onClick={() => this.salvarLoja()} />
				</div>
			</div>
		);
	}

	renderDadosConfiguracao() {
		const { nome, cnpj, email, erros } = this.state;

		return (
			<div className='dados-configuracao'>
				<TextoDados chave='Nome' valor={<InputValor noStyle erro={erros.nome} value={nome} name='nome' handleSubmit={(valor) => this.handleSubmit('nome', valor)} />} />

				<TextoDados chave='Cnpj' valor={<InputValor noStyle value={cnpj}
					erro={erros.cnpj}
					name='cnpj' handleSubmit={(valor) => this.handleSubmit('cnpj', valor)} />} />

				<TextoDados chave='E-mail' valor={<InputValor noStyle
					erro={erros.email}
					value={email} name='email' handleSubmit={(valor) => this.handleSubmit('email', valor)} />} />
			</div>
		);
	}

	renderDadosEndereco() {
		const { local, bairro, numero , complemento, cidade, estado, CEP , erros} = this.state;

		return (
			<div className='dados-endereco'>
				<TextoDados
					chave='Endereço'
					valor={<InputValor noStyle erro={erros.local} value={local} name='local' handleSubmit={(valor) => this.handleSubmit('local', valor)} />}
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

				<TextoDados chave='Cep' valor={<InputValor noStyle erro={erros.CEP} value={CEP} name='cep' handleSubmit={(valor) => this.handleSubmit('CEP', valor)} />} />
			</div>
		);
	}

	salvarLoja() {
		this.clearAlert();
		const { usuario } = this.props;
		if (!usuario) return null;
		if (!this.validate()) return null;		

		this.props.updateLoja(this.state, usuario.loja, (error) => {
			this.setState({
				aviso: {
					status: !error,
					msg: error ? error.message : 'Loja atualizada com sucesso!',
				},
			});
		});
	}

	onAdd = (valor) => {
		this.clearAlert();
		if (!valor) return this.setState({ avisoTelefone: { status: false, msg: 'Preenchar o campo para enviar um novo telefone' } });
		const { telefones } = this.state;

		console.log(telefones)
		this.setState({ telefones: [...telefones, valor] });
		console.log(this.state.telefones)
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
	loja : state.loja.loja
})

export default connect(mapStateToProps,actions)(Configuracoes);
