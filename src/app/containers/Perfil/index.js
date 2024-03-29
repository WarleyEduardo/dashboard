/* modulo 25 - pagina de perfil */

import React from 'react';
import ButtonSimples from '../../components/Button/Simples';
import { TextoDados } from '../../components/Texto/Dados';
import Titulo from '../../components/Texto/Titulo';
import InputValor from '../../components/Inputs/InputValor';
import InputSimples from '../../components/Inputs/Simples';

import { connect } from 'react-redux'

import * as actions from '../../actions'
import AlertGeral from '../../components/Alert/Geral';


class Perfil extends React.Component {

	constructor(props) {

		super()
		this.state = {
		
			nome: props.usuario ?  props.usuario.nome : "",
			email: props.usuario ? props.usuario.email : "",
			

			senhaAntiga: "",
			novaSenha: "",
			confirmarNovaSenha: "",
			aviso:  null,
            erros : {}			
		
		
		};
	}

	componentDidMount() {
		
		this.props.getUser();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.usuario && this.props.usuario && 
			prevProps.usuario.updatedAt !== this.props.usuario.updatedAt
		){
			this.setState({
				nome: this.props.usuario ? this.props.usuario.nome : '',
				email: this.props.usuario ? this.props.usuario.email : ''
			})	
		}
	}

	renderCabecalho()
	{
		return (
			<div className='flex'>
				<div className='flex-1 flex'>
					<Titulo tipo="h1" titulo="Perfil"/>
				</div>
				<div className='flex-1 flex flex-end'>
					<ButtonSimples
						type="success"
						label="Salvar"
						onClick={()=> this.updateUsuario()} 
					
					/>

				</div>

			</div>
		)
	}

	onChangeInput = (field, value) => this.setState({ [field]: value }, () => this.validate());

	validate() {
		
		const { nome, email, senhaAntiga, novaSenha, confirmarNovaSenha } = this.state;
		const erros = {};

		if (!nome) erros.nome = "Preencha aqui com o nome";
		if (!email) erros.email = "Preencha aqui com o email";

		if (senhaAntiga || novaSenha || confirmarNovaSenha) {
			if (!senhaAntiga) erros.senhaAntiga = 'Preencha aqui com a senha antiga';
			if (!novaSenha) erros.novaSenha = 'Preencha aqui com a nova senha';
			if (!confirmarNovaSenha) erros.confirmarNovaSenha = 'repita aqui a nova senha';
			if (novaSenha !== confirmarNovaSenha) erros.confirmarNovaSenha = 'Digite novamente. as senha não conferem!';
		}
			

		this.setState({ erros });
		return !(Object.keys(erros).length > 0);

	}

	updateUsuario() {
		
		if (!this.validate()) return null;
		const { nome, email, novaSenha, senhaAntiga } = this.state;
		const dados = {};
		dados.nome = nome;
		dados.email = email;
		
		if (novaSenha) {
			dados.password = novaSenha;
			dados.oldPassword = senhaAntiga;

		}
        
		this.props.updateUser(dados, (error) => {
			
			if (!error) this.setState({ senhaAntiga: "", novaSenha: "", confirmarNovaSenha: "" })
			this.setState({
				aviso: {
					status: !error,
					msg : error ? error.message : "Dados atualizados com sucesso!"
				}
			})
		})

	}

	renderDadosConfiguracao() {
		
		const { nome,email , erros} = this.state;
		
		return (
			<div className='dados-perfil'>
				<TextoDados
					chave="Nome"
					valor={(
						<InputValor
							noStyle 
							erro = {erros.nome}
							value={nome}
							name="nome"
							handleSubmit={(valor) => this.onChangeInput('nome',valor)}
						/>
					)}
				
				/>

				
				<TextoDados
					chave="E-mail"
					valor={(
						<InputValor
							noStyle 
							value={email}
							erro = {erros.email}
							name="email"
							handleSubmit={(valor) => this.onChangeInput('email',valor)}
						/>
					)}
				
				/>


			</div>
			
		) 
	}

	renderDadosSenha() {
		
		const { senhaAntiga, novaSenha, confirmarNovaSenha , erros} = this.state;
		
		return (
			<div className='dados-configuracao'>
				<InputSimples
					type='password'
					name='senha-antiga'
					label='Senha Antiga'
					value={senhaAntiga}
					error={erros.senhaAntiga}
					onChange={(ev) => this.onChangeInput('senhaAntiga', ev.target.value)}
				/>

				<InputSimples
					type='password'
					name='nova-senha'
					label='Nova Senha'
					value={novaSenha}
					error={erros.novaSenha}
					onChange={(ev) => this.onChangeInput('novaSenha', ev.target.value) }
				/>

				<InputSimples
					type='password'
					name='confirmar-nova-senha'
					label='Confirmar nova senha'
					value={confirmarNovaSenha}
					error={erros.confirmarNovaSenha}
					onChange={(ev) => this.onChangeInput('confirmarNovaSenha',ev.target.value)}
				/>
			</div>
		); 
	}


	render() {
		return (
			<div className='Perfil full-width'>
				<div className='Card'>
					{this.renderCabecalho()}
					<AlertGeral aviso={this.state.aviso} />
					<div className='flex horizontal'>
						<div className='flex-1'>
							{this.renderDadosConfiguracao()}							
						</div>
						 <div className='flex-1'>
							 {this.renderDadosSenha()}
						  </div>
					</div>

				</div>
			</div>
		);
	}
}

const mapStateToProps = state => (
	
	{ usuario : state.auth.usuario}
)

export default connect(mapStateToProps,actions)(Perfil);
