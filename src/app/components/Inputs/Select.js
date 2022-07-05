/* modulo 25  produtos 1 /4 */

import React from 'react';


const InputSelect = ({ value, name, opcoes, onChange }) => (
	
	<select value={value}
		name={name}
		onChange={onChange} >
		
		{
			opcoes.map((opcao,idx) => (		   

				<option key={opcao.value} value={opcao.value}>{opcao.label}</option>
			))

		}

		 </select>
)


export default InputSelect;
