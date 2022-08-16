import React from 'react';
import PageMessage from '../../components/page-message';
import Layout from '../../components/layout';

function NotFound() {
	return (
		<Layout head={<h1>404 | NotFound</h1>}>
			<PageMessage>Такой страницы не существует</PageMessage>
		</Layout>
	);
}

export default React.memo(NotFound);
