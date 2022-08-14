import React from 'react';
import { cn as bem } from '@bem-react/classname';

function Delimeter() {
  const cn = bem('Pagination');
  return <div className={cn('delimeter')}>...</div>;
}

export default React.memo(Delimeter);
