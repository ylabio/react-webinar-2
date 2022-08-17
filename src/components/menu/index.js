import React from 'react';
import propTypes from 'prop-types';
import './styles.css'

const Menu = (props) => {
  return (
    <div className="Menu">
      {props.children}
    </div>
  );
};

Menu.propTypes = {
  children: propTypes.node
}

export default React.memo(Menu);