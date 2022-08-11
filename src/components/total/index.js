import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Total({ children }) {
  const cn = bem('Total');

  return (
    <div className={cn('')}>
      {children}
    </div>
  );
}

Total.propTypes = {
  children: propTypes.node
};

export default Total;
