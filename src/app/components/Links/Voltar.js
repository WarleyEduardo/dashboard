/*  Modulo 24 Detalhes do pedido 4/6 */
import React from 'react';
import { Link } from 'react-router-dom';

const Voltar = ({ path }) => (<Link className='Link-Voltar  fa-solid fa-arrow-left' to={path}/>)

export default Voltar
/*
Entendi, como é o código do seu componente Voltar? Se o path estiver especificado, ele vai voltar ao path, recomendo remover o path dos props dele e colocar o onClick como "onClick={() => history.goBack()}" que aí ele sempre vai voltar a página anterior e não mais para uma especifica com o path. */


