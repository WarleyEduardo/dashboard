/* Modulo 23 -  Tela de login  1/2 */

import React, { Component } from 'react';

/* Modulo 23 -  Tela  de recuperar  e redefinir  senha */

import Titulo from '../../components/Texto/Titulo';
import Input from '../../components/Inputs/Simples';
import Button from '../../components/Button/Simples';


class RecuperarSenha extends Component {

	state = {
       email : ""
	}

    onChangeInput = (field, ev) => this.setState({ [field]: ev.target.value })

	render() {

		const { email } = this.state;
		
		return (
			<div className="Recuperar-Senha">
				<Titulo tipo="h1"
					titulo="LOJA IT" />
				<br />
				<div>
					<p>Para reiniciar sua senha, digite o e-mail abaixo</p>
					<p>Iremos enviar um link para você acessar e entrar uma nova senha.</p>
				</div>
				<br />
				<div>
					<Input label="E-mail"
						value={email}
						onChange={(ev) => this.onChangeInput("email", ev)}
						type="email"
					/>
				</div>
				<br />
				<div>
					<Button type="success"
						rota="/resetar-senha/1"
						label="RESETAR SENHA"
					/>
					
				</div>
			</div>
		)
	}
}

export default RecuperarSenha;