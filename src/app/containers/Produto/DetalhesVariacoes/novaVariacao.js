/* modulo 32 - variações - preparando base para nova variação */

import React, { Component } from 'react';

/* modulo 32 - variações - criando pagina de nova variação  1/2 */
import Titulo from '../../../components/Texto/Titulo'
import ButtonSimples from '../../../components/Button/Simples';
import { TextoDados } from '../../../components/Texto/Dados';
import InputSimples from '../../../components/Inputs/Simples';
import InputSelect from '../../../components/Inputs/Select';
import AlertGeral from '../../../components//Alert/Geral';
import { connect } from 'react-redux';
import * as actions from '../../../actions/variacoes';


class NovaVariacao extends Component {


	constructor(props) {
		
		super()
		this.state = {

			codigo: "",
			nome: "",
			preco: 0,
			promocao: 0,
			quantidade: 0,
			peso: 0,
			freteGratis: "nao",
			largura: 0,
			altura: 0,
			comprimento: 0,
			aviso: null,
			erros : {}
		}
	}

	onChangeInput = (field, value) => this.setState({ [field]: value }, () => this.validate())
	
	validate() {

		const { codigo, nome, preco, quantidade, peso, largura, altura, comprimento } = this.state;
		const erros = {};

		
		if (!codigo) erros.codigo = "Preencha aqui com o codigo da variação";
		if (!nome) erros.nome = 'Preencha aqui com o nome da variação';
		if (!preco) erros.preco = 'Preencha aqui com o preco variação';
		if (!quantidade) erros.quantidade = 'Preencha aqui com a quantidade da variação';
		if (!peso) erros.peso = 'Preencha aqui com o peso da variação';
		if (!largura) erros.largura = 'Preencha aqui com a largura da variação';
		if (!altura) erros.altura = 'Preencha aqui com a altura da variação';
		if (!comprimento) erros.comprimento = 'Preencha aqui com o comprimento da variação';
		
		this.setState({ erros })
		return !(Object.keys(erros).length > 0)
	}

	salvarVariacao() {		
		
		const { usuario, produto, salvarVariacao } = this.props;
		if (!usuario || !produto || !this.validate()) return null;
		salvarVariacao(this.state, produto._id, usuario.loja, (error) => {
			this.setState({
				aviso: {
					status: !error,
					msg: error ? error.message : "Variação criada com sucesso"
				}
			});

			this.props.getVariacoes(usuario.loja , produto._id)
		})	

	}

	renderCabecalho() {
		const { nome } = this.state;
		return (
			<div className='flex horinzontal'>
				<div className='flex-1'>
					<Titulo tipo="h3" titulo={nome ? "Variação - " + nome : "Nova Variação"} />
				</div>
				<div className='flex-1 flex flex-end'>
					<ButtonSimples type="success"
						onClick={() => this.salvarVariacao()}
					   label = "Salvar"
					/>

				</div>

			</div>
		)
	}
	
	renderDadosCadastrais() { 

		const { codigo, nome, preco, quantidade, promocao,  erros} = this.state;

		return (
			<div className='Dados-produtos'>
				<InputSimples
					nome="codigo"
					label="Código"
					value={codigo}
					error={erros.codigo}
					onChange={(ev) => this.onChangeInput("codigo",ev.target.value)}				
				/>
				
				<InputSimples
					nome="none"			
					label="Nome"
					value={nome}
					error={erros.nome}
					onChange={(ev) => this.onChangeInput("nome",ev.target.value)}				
				/>
				
				<InputSimples
					nome="preco"
					type="number"
					label="Preço Padrão"
					value={preco}
					error={erros.preco}
					onChange={(ev) => this.onChangeInput("preco",ev.target.value)}				
				/>
				
				<InputSimples
					nome="promocao"
					type="number"
					label="Preço Promocional"
					value={promocao}
					error={erros.promocao}
					onChange={(ev) => this.onChangeInput("promocao",ev.target.value)}				
				/>
				
				<InputSimples
					nome="quantidade"
					type="number"
					label="Quantidade"
					value={quantidade}
					error={erros.quantidade}
					onChange={(ev) => this.onChangeInput("quantidade",ev.target.value)}				
				/>	

			</div>
		)
	}

	renderDadosEnvio() { 

		const { peso, freteGratis, largura, altura, comprimento,  erros} = this.state;

		return (
			<div className='Dados-produtos'>
				<InputSimples
					nome="peso"
					type="number"
					label="Peso (kg)"
					value={peso}
					error={erros.peso}
					onChange={(ev) => this.onChangeInput("peso",ev.target.value)}				
				/>
				
				<TextoDados
					chave="frete Gratis?"
					valor={(
						<InputSelect
							nome="freteGratis"
							onChange={(ev) => this.onChangeInput("FreteGratis", ev.target.value)}
							value={freteGratis}
							opcoes={[
								{ label: "Sim", value: "sim" },
								{ label: "Não", value: "nao"}
							]}
						
						/>
						
					)}			
				/>
				
				<InputSimples
					nome="largura"
					label="Largura (cm)"
					value={largura}
					error={erros.largura}
					onChange={(ev) => this.onChangeInput("largura",ev.target.value)}				
				/>
				
				<InputSimples
					nome="comprimento"
					type="number"
					label="Comprimento (cm)"
					value={comprimento}
					error={erros.comprimento}
					onChange={(ev) => this.onChangeInput("comprimento",ev.target.value)}				
				/>
				
				<InputSimples
					nome="altura"
					type="number"
					label="Altura"
					value={altura}
					error={erros.altura}
					onChange={(ev) => this.onChangeInput("altura",ev.target.value)}				
				/>	

			</div>
		)
	}
	
	

	render() {
		return (
			<div className='Nova-Variacao'>
				{this.renderCabecalho()}
				<AlertGeral aviso={this.state.aviso} />
				<br />
				<div className='flex horizontal'>
					<div className='flex-3'>
						{this.renderDadosCadastrais()}
					</div>
					<div className='flex-1'>

					</div>
					<div className='flex-3'> 
						{this.renderDadosEnvio()}

					</div>

				</div>
			</div>
		)
	}
}

const mapStatToProps = state => ({
	
	produto: state.produto.produto,
	usuario: state.auth.usuario,
})

export default connect(mapStatToProps,actions)(NovaVariacao);