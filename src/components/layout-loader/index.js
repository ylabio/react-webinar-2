import React from 'react';
import propTypes from 'prop-types';
import Loader from '../loader';

function LayoutLoader({ loading, children }) {
  return loading ? <Loader /> : <>{children}</>;
}

LayoutLoader.propTypes = {
  children: propTypes.node.isRequired,
  loading: propTypes.bool.isRequired,
};

LayoutLoader.defaultProps = {};

export default React.memo(LayoutLoader);
