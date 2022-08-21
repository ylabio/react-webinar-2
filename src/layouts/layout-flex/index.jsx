import React from 'react';
import propTypes from "prop-types";
import './style.css';

function LayoutFlex ({ children, place }) {
  return (
    <div className={place ? `layout-flex layout-flex--${place}` : 'layout-flex'}>
      {React.Children.map(children, (child) =>
        <div key={child.key} className='layout-flex__item'>{child}</div>
      )}
    </div>
  )
}

LayoutFlex.propTypes = {
  children: propTypes.node,
  place: propTypes.oneOf(['row-right', 'row-between']),
};

export default React.memo(LayoutFlex);