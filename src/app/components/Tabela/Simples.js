/*
  Modulo 23 - Dashboard  Finalizando  tela de pedidos 2/3	
*/


import React  from 'react';
import { Link } from 'react-router-dom';

const TabelaSimples = ({ cabecalho, dados, onClick }) =>{  

     
	return (  


		<div className='TabelaSimples'>
			<table className='simples'>
				<thead>
					<tr>
						{cabecalho.map((item, idx) => (
							<th key={idx}>{item}</th>
						))}
					</tr>
				</thead>
				<tbody>

					{dados.map((linha, idx) => (
						<tr key={idx}>
							{
								cabecalho.map((item, index) =>
								(
									<td key={index}>{linha[item] || ""}</td>
								    	
								))
							}

							{linha['botaoDetalhes'] && (
								<td>
									<Link to={linha['botaoDetalhes']}>
										<button className='button button-danger button-small'
											onClick={() => onClick()}										
										>
											DETALHES
										</button>
									</Link>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TabelaSimples;
