
/* Modulo 23 -  Tela de login  1/2 */

import React, { Component } from 'react';

/* Modulo 23 -  Tela  de recuperar  e redefinir  senha */

import Titulo from '../../components/Texto/Titulo';
import Input from '../../components/Inputs/Simples';
import Button from '../../components/Button/Simples';


class ResetarSenha extends Component {
	state = {
		senha: '',
		confirmarSenha: '',
	};

	onChangeInput = (field, ev) => this.setState({ [field]: ev.target.value });

	render() {

		const { senha, confirmarSenha } = this.state;

		return (
			<div className='Resetar-Senha'>
				<Titulo tipo='h1' titulo='LOJA IT' />
				<br />
				<div>
					<p>para reiniciar a senha , digite a nova senha e confirme no campo abaixo</p>
				</div>
				<br />
				<div>
					<Input label='senha' type='password' value={senha} onChange={(ev) => this.onChangeInput('senha', ev)} />
					<Input label='Confirmar senha' type='password' value={confirmarSenha} onChange={(ev) => this.onChangeInput('confirmarSenha', ev)} />
				</div>
				<div>
					<Button type="success" rota='/' label="RESETAR SENHA"/>
				</div>
			</div>
		); 
	}
	
}

export default ResetarSenha;