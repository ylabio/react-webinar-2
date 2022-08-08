import React from "react"
import propTypes from 'prop-types';

const Simple = (
  {cn, bemIndex, text}
) => (
  <div className={cn(bemIndex)}>
    {text}
  </div>
)
Simple.propTypes = {
  cn: propTypes.func.isRequired,
  bemIndex: propTypes.string.isRequired,
  text: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired
}

export default React.memo(Simple)