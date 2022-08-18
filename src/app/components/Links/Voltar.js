/*  Modulo 24 Detalhes do pedido 4/6 */
import React from 'react';
import { Link } from 'react-router-dom';

//const Voltar = ({ path }) => (<Link className='Link-Voltar  fa-solid fa-arrow-left' to={path}/>)

const Voltar = ({ path, history }) => {
	
	if (path) return (<Link className='Link-Voltar  fa-solid fa-arrow-left' to={path} />)
	else return <span className='Link-Voltar  fa-solid fa-arrow-left'
		onClick={ ()=>history.goBack() }></span>; 
		

}

export default Voltar


