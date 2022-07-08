/* modulo  25 configurações da loja */

import React from 'react';
import ButtonSimples from '../../components/Button/Simples';
import { TextoDados } from '../../components/Texto/Dados';
import Titulo from '../../components/Texto/Titulo';
import InputValor from '../../components/Inputs/InputValor';
import ListaDinamicaSimples from '../../components/Listas/ListaDinamicaSimples';

class Configuracoes extends React.Component {

	state = {
		
		nome: "Loja IT",
		cnpj: "12.345.789/0001-02",
		email: "atendimento@lojait.com.br",
		
		endereco: "Rua teste,1",
		bairro: "Centro",
		cidade : "São Paulo",
		estado: "SP",
		cep: "12345-123",
		telefones: [
			"11 1234-5678",
			"11 8765-4321"
		]
		
		
	}

	renderCabecalho()
	{
		return (
			<div className='flex'>
				<div className='flex-1 flex'>
					<Titulo tipo="h1" titulo="Configurações"/>
				</div>
				<div className='flex-1 flex flex-end'>
					<ButtonSimples
						type="success"
						label="Salvar"
						onClick={()=> alert("salvo")} 
					
					/>

				</div>

			</div>
		)
	}

	renderDadosConfiguracao() {
		
		const { nome, cnpj, email } = this.state;
		
		return (
			<div className='dados-configuracao'>
				<TextoDados
					chave="Nome"
					valor={(
						<InputValor
							noStyle 
							value={nome}
							name="nome"
							handleSubmit={(valor) => this.setState({nome:valor})}
						/>
					)}
				
				/>

				<TextoDados
					chave="Cnpj"
					valor={(
						<InputValor
							noStyle 
							value={cnpj}
							name="cnpj"
							handleSubmit={(valor) => this.setState({cnpj:valor})}
						/>
					)}
				
				/>
				
				<TextoDados
					chave="E-mail"
					valor={(
						<InputValor
							noStyle 
							value={email}
							name="email"
							handleSubmit={(valor) => this.setState({email:valor})}
						/>
					)}
				
				/>

			</div>
			
		) 
	}

	renderDadosEndereco() {
		
		const { endereco, bairro, cidade , estado,cep} = this.state;
		
		return (
			<div className='dados-endereco'>
				<TextoDados
					chave="Endereco"
					valor={(
						<InputValor	
						    noStyle 	
							value={endereco}
							name="endereco"
							handleSubmit={(valor) => this.setState({endereco:valor})}
						/>
					)}
				
				/>

				<TextoDados
					chave="Bairro"
					valor={(
						<InputValor
							noStyle 
							value={bairro}
							name="bairro"
							handleSubmit={(valor) => this.setState({bairro:valor})}
						/>
					)}
				
				/>
				
				<TextoDados
					chave="Cidade"
					valor={(
						<InputValor
							noStyle  
							value={cidade}
							name="cidade"
							handleSubmit={(valor) => this.setState({cidade:valor})}
						/>
					)}
				
				/>

				<TextoDados
					chave="Estado"
					valor={(
						<InputValor
						   noStyle
							value={estado}
							name="estado"
							handleSubmit={(valor) => this.setState({estado:valor})}
						/>
					)}
				
				/>
				<TextoDados
					chave="Cep"
					valor={(
						<InputValor
							noStyle
							value={cep}
							name="cep"
							handleSubmit={(valor) => this.setState({cep:valor})}
						/>
					)}
				
				/>


			</div>
			
		) 
	}


	onAdd = (valor) => {
		if (!valor) return;
		const { telefones } = this.state;
		this.setState({telefones: [...telefones,valor]})
	}

	onRemove = (idx) => {
		if (!idx) return;
		const { telefones } = this.state;
		this.setState({telefones: telefones.filter( (item,index) => index !== idx )})
	}


	renderTelefones() {

		const { telefones } = this.state;
		
		return (
			
			<div className='dados-telefones'>

				<Titulo tipo="h3" titulo="Telefones"/>

				<ListaDinamicaSimples
					dados={telefones}
					onAdd={this.onAdd}
					onRemove={this.onRemove}
				/>

			</div>
		)
	}



	render() {
		return (
			<div className='Configuracoes full-width'>
				<div className='Card'>
					{this.renderCabecalho()}
					<div className='flex horizontal'>
						<div className='flex-1'>
							{this.renderDadosConfiguracao()}
							
						</div>
					</div>
					
					<br/> <hr/> <br/>

					<div className='flex horizontal'>
						  <div className='flex-1'>
							 {this.renderDadosEndereco()}

						  </div>
						
						  <div className='flex-1'>
							 {this.renderTelefones()}

						  </div>
					</div>
					

				</div>
			</div>
		);
	}
}

export default Configuracoes;
