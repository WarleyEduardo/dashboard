/*
  Modulo 23 - Dashboard  Finalizando  tela de pedidos 2/3	
*/

import React from 'react';
import { Link } from 'react-router-dom';


const TabelaSimples = ({ cabecalho, dados ,  onClick  }) => (
	<div className='TabelaSimples'>
		<table className='simples'>
			<thead>
				<tr>
					{cabecalho.map((item, idx) => (
						<th key={idx}>{ item.indexOf('*') === 0 ? item.substring(1) : item }</th>
					))
					}
				</tr>
			</thead>
			
				<tbody>
					{dados.map((linha, idx) =>

					(
				   	

						<tr key={idx}>
							{
								cabecalho.map((item, index) => {

									let td = '';

									let CriarColunaBotao = item.indexOf('*') === 0;
									
															
									if (CriarColunaBotao) {	

										td = 
											<td>
												<Link to={linha['botaoDetalhes']}>
													<button														
														className='button button-danger button-small'
														onClick={() => onClick()}	
													>
														DETALHES
													</button>
												</Link>
											</td> 
										 

						
									
									} else
									{
									  td = <td key={index}> {linha[item] || ''}</td>; 	

									}

									
									
								
									return (td);
								
								}
								
								    	
							
							
								)

								
							
							}
						 

						</tr>
						
					))}

			
				</tbody>
		
		</table>
	</div>
);




export default TabelaSimples;
