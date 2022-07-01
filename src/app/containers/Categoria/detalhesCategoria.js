/* Modulo 25  Categoria 1/2 */

import React, { Component } from 'react';
import Titulo from '../../components/Texto/Titulo';
import ButtonSimples from '../../components/Button/Simples'
import { TextoDados } from '../../components/Texto/Dados'
import Inputvalor from '../../components/Inputs/InputValor';

/*Modulo 25 produtos 1/4 */

import InputSelect from '../../components/Inputs/Select';


class DetalhesCategoria extends Component{

	state = {
		
		nome: "Categoria",
		disponibilidade: "disponivel",
		codigo:"categoria"

	}


	renderCabecalho() {

		const { nome } = this.state;
		
		return (
			<div className='flex'>
				<div className='flex-1 flex'>
					<Titulo
						tipo="h1"
						titulo={nome}	
					/>					
				</div>

				<div className='flex-1 flex flex-end'>
					<ButtonSimples
						onClick={() => alert('Salvo')}
						type="success"
						label="Salvar"
					/>

					<ButtonSimples
						onClick={() => alert('removido')}
						type="danger"
						label= "Remover"
					/>

				</div>

			</div>
		)

	}

	renderDados() {
		const { nome, disponibilidade, codigo } = this.state;
		
	 return (
		 <div>

		 <TextoDados
				 chave="Código"
				 valor={(
					 <Inputvalor noStyle
						 name="codigo"
						 value={codigo}
						 handleSubmit={(valor) => this.setState({ codigo: valor })}
						 
					 />
				 )}			 
			 />

			 <TextoDados
				 chave="Nome"
				 valor={(
					 <Inputvalor noStyle
						 name="nome"
						 value={nome}
						 handleSubmit={(valor) => this.setState({ nome: valor })}
						 
					 />
				 )}			 
			 />

			 <br />
				 
			 <TextoDados
			 
				 chave="Disponibilidade"
				 valor={(

					 
					 <InputSelect
						 name="disponibilidade"
						 onChange={(ev) => this.setState({ disponibilidade: ev.target.value })}
						 value={disponibilidade}
						 opcoes={[
							 
							 {label: "Disponível", value: "disponivel" },
							 {label:"Indisponível", value:"indisponivel"}
						 ]}
					 
					 
					 />

					 /* modulo 25 produto 1/4 
					 <select value={disponibilidade}
						 onChange={(ev) => this.setState({ disponibilidade: ev.target.value })}	 >
						 <option value={"disponivel"}>Disponível</option>
						 <option value={"indisponivel"}>Indisponível</option>
			          </select>
			          */
				 )}
			 />

			     
			 
				
		  </div>
	  )	
	
	}

	render()
	{ 
		return (
			<div className='Detalhes-Categoria'>
				{this.renderCabecalho()}
				{this.renderDados()}
			</div>
		);
	}
}


export default DetalhesCategoria;