/* Modulo 25  Clientes 1/2 */

import React, { Component } from 'react';
import DetalhesCategoria from './detalhesCategoria';
import ListadeProdutos from './listaDeProdutos';

class Categoria extends Component{
	
   render() {
	  
	   return (
		   
		   <div className='Categoria full-width'>
			   <div className='Card'>
				   <div>
                      <DetalhesCategoria/>
				   </div>
				   <div>
                       <ListadeProdutos/>
				   </div>

			   </div>

		   </div>
	   )

   }
}


export default Categoria;