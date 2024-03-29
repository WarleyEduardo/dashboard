/* Modulo 23 -  Tela de login  1/2 */

import React, { Component } from 'react';

import Titulo from '../../components/Texto/Titulo'

/*
  Modulo 23 -  Tela de login 2/2
*/

import Input from '../../components/Inputs/Simples';
import Checkbox from '../../components/Inputs/Checkbox';
import Button from '../../components/Button/Simples'

/* Modulo 27 - definindo a base e a primeira resquisição */
import { connect } from 'react-redux';
import * as actions from '../../actions'

/* modulo 27 fazendo login com localStorage */
import { urlRecuperarSenha } from '../../config'

/* modulo 27 - login com erro : criando Error Handling 1/2 */
import Alert from '../../components/Alert/Danger'


class Login extends Component {
	state = {
		email: '',
		senha: '',
		opcaoLembrar: true,
		erros: {},
	};

	onChangeInput = (field, ev) => {
		this.setState({ [field]: ev.target.value });
		this.validate();
	};

	onChangeCheckbox2 = (ev) => {
		
		this.setState({ opcaoLembrar: ev.target.checked });		
	}

	onChangeCheckbox = (field) => {
		this.setState({ [field]: !this.state[field] });

		console.log(this.state.opcaoLembrar);
	};

	/* Modulo 27 - definindo a base e a primeira resquisição */

	handleLogin() {
		const { email, senha: password, opcaoLembrar } = this.state;

		if (!this.validate()) return;

		
		this.props.handleLogin({ email, password, opcaoLembrar }, (error) => {
			this.setState({ erros: { ...this.state.erros, form: error } });
		});
	}

	/* modulo 27 -  login : validando o  formulário */

	validate() {
		const { email, senha } = this.state;
		const erros = {};
		if (!email) erros.email = 'Preencha aqui o seu e-mail';
		if (!senha) erros.senha = 'Preencha aqui sua senha';
		this.setState({ erros });
		return !(Object.keys(erros).length > 0);
	}

	render() {
		const { email, senha, opcaoLembrar, erros } = this.state;

		return (
			<div className='Login flex flex-center'>
				<div className='Card'>
					<div className='flex vertical flex-center'>
						<Titulo tipo='1' titulo='Loja IT' />
						<p>Faça o seu login abaixo</p>
					</div>
					<br />
					<br />

					<Alert error={erros.form} />

					<Input label='E-mail' value={email} type='email' error={erros.email} onChange={(ev) => this.onChangeInput('email', ev)} />

					<Input label='Senha' value={senha} type='password' error={erros.senha} onChange={(ev) => this.onChangeInput('senha', ev)} />

					<div className='flex'>
						<div className='flex-1'>
							{/*<Checkbox value={opcaoLembrar} onChange={() => this.onChangeCheckbox('opcaoLembrar')}
							 */}
							<Checkbox value={opcaoLembrar} onChange={(ev) => this.onChangeCheckbox2(ev)} label='Lembrar?' />
						</div>
						<div className='flex-1 flex flex-end'>
							{/* modulo 27  fazendo login com localStorage
								<Link to='/recuperar-senha'>
									<small>Esqueceu sua senha?</small>
							</Link>
							*/}
							<a href={urlRecuperarSenha}>
								<span>Esqueceu sua senha?</span>
							</a>
						</div>
					</div>
					<br />
					<br />
					<div className='flex flex-center'>
						<Button type='success' label='Entrar' onClick={() => this.handleLogin()} />
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null,actions)(Login);
