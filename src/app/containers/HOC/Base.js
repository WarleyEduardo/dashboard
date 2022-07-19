/*
  Modulo 22 - Dashboard criando a base 
  o que é OHC e criando a base dos menus da Dashboard.

*/

import React from 'react';
import Base from '../Base';

/* Modulo 27 -  login com sucesso: autenticação de rota */
import { connect } from 'react-redux';
import * as actions  from '../../actions'

const base = Component => {

		 
	 class ComponentBase extends React.Component {

	   /* Modulo 27 -  login com sucesso: autenticação de rota */
		 componentWillMount() {
			
			const { getUser, authorized, history, usuario } = this.props;
			getUser();
			
			 if (!authorized || !usuario || !usuario.role.includes("admin")) history.replace('/Login');
		 }
		 
		 componentWillUpdate(nextProps) {
			
			 const { history } = this.props
			 
			 if (!nextProps.authorized || !nextProps.usuario ||
				 !nextProps.usuario.role.includes("admin")) history.replace('/Login');
			
		 }

		render() {
			 
			return (

				<Base  history={this.props.history}>
				    <Component {...this.props} />
				</Base>
			)
		 }

	}

	const mapStateToProps = state => ({

		authorized: state.auth.authorized,
		usuario: state.auth.usuario
	})

	return connect(mapStateToProps, actions)(ComponentBase);
	
}
 
export default base;

