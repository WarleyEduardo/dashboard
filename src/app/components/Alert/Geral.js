/* Modulo 28 - Detalhes do pedido  -  ativando botão de cancelar */
import React from 'react';


const AlertGeral = ({ aviso }) => {
	
	if (!aviso) return null

	const { status, msg } = aviso;
	return (
		<div className={`alert alert-${status ? "success" : "danger"}`}>
			<span>{msg}</span>
		</div>
	)
}

export default AlertGeral;
