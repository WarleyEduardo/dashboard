/* 
 Modulo 21 - Dashboard - instalando o redux e preparando as pastas.
 instalando o sistema de rotas  e criando  o primeiro container  e componente.
*/


import React  from 'react';

const Titulo = ({ tipo, titulo }) => {
	switch (tipo) {	
		case 'h4' : return <h4 className='Subtitulo'>{titulo}</h4>;
		case 'h2': return <h2 className='Titulo-Secundario'>{titulo}</h2>;
		case 'h1': 
		default : return <h1 className='Titulo-principal'>{titulo}</h1>;
	}
};

export default Titulo;