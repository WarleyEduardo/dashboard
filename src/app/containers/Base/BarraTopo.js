/*
  Modulo 22 - Dashboard crianod a base.
  Criando o menu da Dashboard  1/2
  */

import React from 'react';
import { Link } from 'react-router-dom';
 
  const BarraTopo = () => (
		<div className='Barra-Topo flex horizontal full-width'>
			<div className='flex-1 flex flex-start'>
				<a href='/pedidos'>Ver Loja</a>
			</div>
			<div className='flex-1 flex flex-end'>
				{/* teste warley <Link to="logout">Sair</Link>*/}
				<Link to='/Login'>Sair</Link>
			</div>
		</div>
  );
  
export default BarraTopo;