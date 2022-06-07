/*
  Modulo 22 - Dashboard crianod a base.
  Criando o menu da Dashboard  1/2
  */

  /*
    <i className='fas fa-arrow-left'/>	
	o fas é uma biblioteca de icones  
	font awesome criando
	​Font Awesome: https://fontawesome.com/start
   
  */

import ListItems from './ListItems';	


import React, { Component } from 'react';
  
class Menu extends Component {
	state = { open: true };

	/*
		  Modulo 22 - criando a base 
		  Criando o menu da Dashboard 2/2
		  
		*/

	toggleOpen = () => this.setState({ open: !this.state.open });

	render() {
		const { open } = this.state;

		return (
			<div className={`Menu ${open ? "menu-open":""}`}>
				<div className= {`item-top flex ${open ? "flex-end":"flex-center"}`}  onClick={() => this.toggleOpen()}>
					{(<i className={`fas fa-arrow-${open?"left":"right"}`} />)}
				</div>
				<hr />
				<ListItems open={open} history={this.props.history} />
			</div>
		);
	}
}


export default Menu;