import React from 'react';
import propTypes from 'prop-types';
import Loader from '../loader';
import useSelector from '../../utils/use-selector';

function LayoutLoader({ children }) {
  const select = useSelector((state) => ({
    loading: state.loading,
  }));

  return select.loading ? <Loader /> : <>{children}</>;
}

LayoutLoader.propTypes = {
  children: propTypes.node.isRequired,
};

LayoutLoader.defaultProps = {};

export default React.memo(LayoutLoader);
