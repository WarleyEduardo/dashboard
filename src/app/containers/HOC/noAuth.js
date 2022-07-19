/* modulo 27 -  login com sucesso : autenticação  de rotas */


import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const noAuth = Component => {

		 
	 class ComponentnoAuth extends React.Component {

	 
		 componentWillMount() {
			
			 const { getUser, authorized, history } = this.props;
			 getUser();
			 if (authorized) history.replace("/")
		 }
		 
		 componentWillUpdate(nextProps) {
			
			 const { authorized, history } = this.props
			 
			 if (!authorized && nextProps.authorized) history.replace("/")
			
		 }

		render() {
			 
			return (

				<div>
				    <Component {...this.props} />
				</div>
			)
		 }

	}

	const mapStateToProps = state => ({

		authorized: state.auth.authorized,
		usuario: state.auth.usuario
	})

	return connect(mapStateToProps, actions)(ComponentnoAuth);
	
}
 
export default noAuth;

