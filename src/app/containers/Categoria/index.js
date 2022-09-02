/* Modulo 25  Clientes 1/2 */

import React, { Component } from 'react';
import DetalhesCategoria from './detalhesCategoria';
import ListadeProdutos from './listaDeProdutos';

/* Modulo 30 Detalhes da categoria
 configuração inicial do index
*/

import { connect } from 'react-redux'
import * as actions from '../../actions/categorias';

class Categoria extends Component{


	componentWillMount() {
		const { usuario } = this.props;
		const { id } = this.props.match.params;
		if (!usuario || !id) return null;
		this.props.getCategoria(id, usuario.loja);

	}

	componentWillUnmount() {
		this.props.limparCategoria()
	}
	
   render() {
	  
	   return (
		   
		   <div className='Categoria full-width'>
			   <div className='Card'>
				   <div>
					   <DetalhesCategoria history={this.props.history} />
				   </div>
				   <div>
                       <ListadeProdutos/>
				   </div>

			   </div>

		   </div>
	   )

   }
}

const mapStateToProps = state => ({
	usuario: state.auth.usuario
})


export default connect(mapStateToProps,actions)(Categoria);