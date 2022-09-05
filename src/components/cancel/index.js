import React from 'react';
import propTypes from 'prop-types';

const Cancel = (props) => {
  return <button className={props.className} type="button" onClick={props.closeText}>Отмена</button>
}

Comment.propTypes = {
  className: propTypes.string,
  closeText: propTypes.func,
}

export default React.memo(Cancel);
