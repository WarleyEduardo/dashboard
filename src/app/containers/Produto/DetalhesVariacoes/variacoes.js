/* Modulo 25 detalhes do produto 3/4 */

import React, { Component } from 'react';



class Variacoes extends Component {
	state = {
		variacoes: [
			{ nome: 'P', id: 'C8J8338' },
			{ nome: 'M', id: 'F93KC934K' },
		],
	};

	render() {
		const { variacoes } = this.state;

		return (
			<div className='Variacoes flex vertical'>
				{variacoes.map((item, idx) => (
					<div className='Variacao-item'>
						<span>{item.nome}</span>
					</div>
				))}
			</div>
		);
	}
}

export default Variacoes;