import React from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';

function LayoutComments({ children }) {
  const cn = bem('LayoutComments');

  return <div className={cn()}>{children}</div>;
}

LayoutComments.propTypes = {
  children: propTypes.node,
  flex: propTypes.oneOf(['start', 'end', 'between']),
  indent: propTypes.oneOf(['small', 'big']),
};

LayoutComments.defaultProps = {};

export default React.memo(LayoutComments);
