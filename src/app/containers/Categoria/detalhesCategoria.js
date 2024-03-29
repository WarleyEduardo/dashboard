/* Modulo 25  Categoria 1/2 */

import React, { Component } from 'react';
import Titulo from '../../components/Texto/Titulo';
import ButtonSimples from '../../components/Button/Simples'
import { TextoDados } from '../../components/Texto/Dados'
import Inputvalor from '../../components/Inputs/InputValor';

/*Modulo 25 produtos 1/4 */

import InputSelect from '../../components/Inputs/Select';
import Voltar from '../../components/Links/Voltar';

/* Modulo 30 Detalhes da categoria
 implementando actions  e configurações 1/2
*/

import { connect } from 'react-redux'
import AlertGeral from '../../components/Alert/Geral';
import * as actions from '../../actions/categorias'

class DetalhesCategoria extends Component {

	generateStateCategoria = (props) => ({
		nome: props.categoria ? props.categoria.nome : '',
		codigo: props.categoria ? props.categoria.codigo : '',
		disponibilidade: props.categoria ? (props.categoria.disponibilidade || props.categoria.disponibilidade === undefined ? 'disponivel' : 'indisponivel') : '',
	});

	constructor(props) {
		super();
		this.state = {
			...this.generateStateCategoria(props),
			erros: {},
			aviso: null,
			produtos : [],
		};		
	}


	componentDidUpdate(prevProps) {
		if (
			(!prevProps.categoria && this.props.categoria) ||
			(
				prevProps.categoria &&
				this.props.categoria &&
				prevProps.categoria.updatedAt !== this.props.categoria.updatedAt
			)
		)this.setState(this.generateStateCategoria(this.props));
	}


	salvarCategoria() {
		const { usuario, categoria } = this.props;
		if (!usuario || !categoria) return null;
		if (!this.validate()) return null;

		this.props.updateCategoria(this.state, categoria._id, usuario.loja, (error) => {
			this.setState({
				aviso: {
					status: !error,
					msg: error ? error.message : 'Categoria atualizada com sucesso!',
				},
			});
		});
	}

	removerCategoria() {
		const { usuario, categoria } = this.props;
		if (!usuario || !categoria) return null;

		if (!window.confirm("Você realmente deseja remover essa categoria?")) return null;

		this.props.removerCategoria(categoria._id, usuario.loja, (error) => {
			if (error)
				this.setState({
					aviso: {
						status: !error,
						msg: error ? error.message : 'Categoria removida com sucesso!',
					},
				});
			else this.props.history.goBack();
		});
	}

	renderCabecalho() {
		const { nome } = this.state;

		return (
			<div className='flex'>
				<div className='flex-1 flex'>
					<Titulo tipo='h1' titulo={nome} />
				</div>

				<div className='flex-1 flex flex-end'>
					<ButtonSimples onClick={() => this.salvarCategoria()} type='success' label='Salvar' />

					<ButtonSimples onClick={() => this.removerCategoria()} type='danger' label='Remover' />
				</div>
			</div>
		);
	}


	
	onChangeInput = (field, value) => this.setState({ [field]: value }, () => this.validate());
	
	validate() { 
		

		const { nome, codigo } = this.state;
		const erros = {};
         
		if (!nome) erros.nome = "Preencha aqui com o nome da categoria";
		if (!codigo) erros.codigo = "Preencha aqui com o código da categoria"
		if (codigo && codigo.length < 4) erros.codigo = 'Preencha aqui com mais que 4 caracteres';
		if (codigo && codigo.indexOf(" ") !== -1) erros.codigo = 'Não coloque espaços no código';
      
		this.setState({ erros });
		return !(Object.keys(erros).length > 0)
	}

	renderDados() {
		const { nome, disponibilidade, codigo, erros } = this.state;

		return (
			<div>
				<TextoDados
					chave='Código'
					valor={<Inputvalor noStyle name='codigo' value={codigo} erro={erros.codigo} handleSubmit={(valor) => this.onChangeInput('codigo', valor)} />}
				/>

				<TextoDados chave='Nome' valor={<Inputvalor noStyle name='nome' value={nome} erro={erros.nome} handleSubmit={(valor) => this.onChangeInput('nome', valor)} />} />

				<br />

				<TextoDados
					chave='Disponibilidade'
					valor={
						<InputSelect
							name='disponibilidade'
							onChange={(ev) => this.setState({ disponibilidade: ev.target.value })}
							value={disponibilidade}
							opcoes={[
								{ label: 'Disponível', value: 'disponivel' },
								{ label: 'Indisponível', value: 'indisponivel' },
							]}
						/>

						/* modulo 25 produto 1/4 
					 <select value={disponibilidade}
						 onChange={(ev) => this.setState({ disponibilidade: ev.target.value })}	 >
						 <option value={"disponivel"}>Disponível</option>
						 <option value={"indisponivel"}>Indisponível</option>
			          </select>
			          */
					}
				/>

			
			</div>
		);
	}

	render() {
		return (
			<div className='Detalhes-Categoria'>				
				<Voltar history={this.props.history} />
				<AlertGeral aviso={this.state.aviso} />	         	
			    {this.renderCabecalho()}
				{this.renderDados()}
			</div>
		);
	}
}

const mapStateToProps = state =>({

	categoria : state.categoria.categoria,	
	usuario : state.auth.usuario
})

export default connect(mapStateToProps,actions)(DetalhesCategoria);