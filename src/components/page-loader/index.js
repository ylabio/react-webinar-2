import React from 'react';
import propTypes from 'prop-types';
import Spinner from '../../components/spinner';
import Layout from '../../components/layout';
import LayoutFlex from '../../components/layout-flex';

function PageLoader({ isWaiting }) {
	return (
		<Spinner active={isWaiting}>
			<Layout>
				<LayoutFlex flex="start" flexDirection="column" alignItems="start" padding="40-20">
					<h1>Loading...</h1>
				</LayoutFlex>
			</Layout>
		</Spinner>
	)
}

PageLoader.propTypes = {
  isWaiting: propTypes.bool.isRequired
}

PageLoader.defaultProps = {
}

export default PageLoader;