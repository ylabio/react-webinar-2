import React from 'react';
import propTypes from 'prop-types';
import './style.css';

function Controls({ btnText, btnAction, children }) {
  return (
    <div className='Controls'>
      { children }
      <button onClick={btnAction}>{ btnText }</button>
    </div>
  )
}

Controls.propTypes = {
  btnText: propTypes.string,
  btnAction: propTypes.func,
}

Controls.defaultProps = {
  btnText: 'btnText',
  btnAction: () => {}
}

export default React.memo(Controls);
