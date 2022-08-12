import React from 'react';
import ErrorPage from '../../components/error-page';
import Layout from '../../components/layout';

function NotFound() {
	return (
		<Layout head={<h1>404 | NotFound</h1>}>
			<ErrorPage>Такой страницы не существует</ErrorPage>
		</Layout>
	);
}

export default React.memo(NotFound);
