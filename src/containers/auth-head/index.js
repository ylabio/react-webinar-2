import React from 'react';
import { Link } from 'react-router-dom';
import LayoutFlex from '../../components/layout-flex';

function AuthHead() {
	return (
		<LayoutFlex flex='end' padding={false}>
			<Link to='/login'>
				<button>Вход</button>
			</Link>
		</LayoutFlex>
	);
}

export default React.memo(AuthHead);
