import React from 'react';
import propTypes from 'prop-types';

function Spacing({ width, height }){
  return (
    <div style={{ width, height }} />      
  )
}

Spacing.propTypes = {
  width: propTypes.number,
  height: propTypes.number
}

Spacing.defaultProps = {
  width: 0,
  height: 0
}

export default React.memo(Spacing);
