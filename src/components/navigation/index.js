import propTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function Navigation({translate}){
  return (
    <Link to="/">
	  {translate('home')}
    </Link>
  )
}

Navigation.propTypes = {
  page: propTypes.oneOfType([propTypes.string, propTypes.number]),
  setPage: propTypes.func,
  total: propTypes.number
}

Navigation.defaultProps = {
  setPage: ()=>{},
  page: 1
}

export default React.memo(Navigation);
