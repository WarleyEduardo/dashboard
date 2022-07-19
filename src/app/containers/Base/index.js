/*
  Modulo 22 - Dashboard criando a base 
  o que é OHC e criando a base dos menus da Dashboard.

*/
import React from 'react';


		
/*
  Modulo 22 - Dashboard criando a base 
  Criando estrutura dos menus da dashboard.
*/




/*
  Modulo 22 - Dashboard crianod a base.
  Criando o menu da Dashboard  1/2

  const BarraTopo = () => (
	
	<div className='flex horizontal full-width'>
		<div className='flex-1 flex flex-start'>
			<a href="#">Ver Loja</a>
		</div>
		<div className='flex-1 flex flex-end'>
			<Link to="logout">Sair</Link>
		</div>
	</div>
)

*/

import BarraTopo from './BarraTopo';
import Menu from './Menu';

/* modulo 27 -  login com sucesso : autenticação  de rotas */

import { connect } from 'react-redux';
import * as actions from '../../actions' 

class Dashboard extends React.Component {

	render() {
		return (
			<div className='flex horizontal full-height'>
				<div className='flex vertical'>
					<Menu history={this.props.history}/>
				</div>

				<div className='flex vertical full-width'>
					<div className='flex horizontal'>
						<BarraTopo handleLogout={this.props.handleLogout} />
					</div>

					<main className='flex full-height'>
						{this.props.children}
					</main>
				</div>
			</div>
		); 
  }

}

export default connect(null,actions)(Dashboard);