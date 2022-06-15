/*
  Modulo 23 -  Tela de login 2/2
  &nbsp; = espaço invisivel
*/

import React from 'react';

const Checkbox = ({ label, value, onChange }) => (

	<div className='Checkbox'>
		<input type="checkbox" checked={value} onChange={onchange} />
		<span>&nbsp;{label}</span>

	</div>
)
	
export default Checkbox;


