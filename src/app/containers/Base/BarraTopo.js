/*
  Modulo 22 - Dashboard crianod a base.
  Criando o menu da Dashboard  1/2
  */

import React from 'react'; 
  const BarraTopo = ({ handleLogout }) => (
		<div className='Barra-Topo flex horizontal full-width'>
			<div className='flex-1 flex flex-start'>
				<a href='/'>Ver Loja</a>
			</div>
			<div className='flex-1 flex flex-end'>
				<span onClick={() => handleLogout()}>Sair</span>
			</div>
		</div>
  );
  
export default BarraTopo;