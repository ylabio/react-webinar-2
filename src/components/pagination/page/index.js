import React from 'react';
import { cn as bem } from '@bem-react/classname';

function Page({ number, activePage, setActivePage }) {
  const cn = bem('Pagination');
  return (
    <div
      className={`${cn('page')} ${number === activePage ? 'isActive' : ''}`}
      onClick={() => setActivePage(number)}>
      {number}
    </div>
  );
}

export default React.memo(Page);
