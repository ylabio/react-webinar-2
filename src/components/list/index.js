import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function List({ children }) {
  const cn = bem('List');

  return <div className={cn()}>{children}</div>;
}

export default React.memo(List);
