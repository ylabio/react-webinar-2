import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import React from 'react';
import './style.css';

function LayoutControls({children}) {
  const cn = bem('Controls');
  return <div className={cn()}>{children}</div>;
}

LayoutControls.propTypes = {
  children: propTypes.node.isRequired
};

export default React.memo(LayoutControls);
