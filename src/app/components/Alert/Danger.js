/* modulo 27 - login com erro : criando Error Handling 1/2 */

import React from 'react';

const AlertDanger = ({ error }) => {
	
	if (!error) return null;

	return (

		<div className='alert alert-danger'>
			<span>
				{error.message}
			</span>
		</div>
	)
};

export default AlertDanger;