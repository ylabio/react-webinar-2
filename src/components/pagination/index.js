import React, { useMemo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import PagBtn from '../pag-btn';

const Pagination = ({ pages, activePage = 1 }) => {
  const cn = bem('Pagination');

  const type = useMemo(() => {
    if (!pages) return null;
    if (pages <= 4) return 'less-start';
    if (activePage <= 2 && pages > 4) return 'start';
    if (activePage + 1 >= pages) return 'end';
    return 'middle';
  }, [activePage, pages]);

  return (
    <div className={cn()}>
      <div className={cn('controls')}>
        {type === 'less-start' ? (
          <LessStartPagBtns activePage={activePage} pages={pages} />
        ) : type === 'start' ? (
          <FourPagBtns amount={pages} active={activePage} dots={'start'} />
        ) : type === 'middle' ? (
          <FivePagBtns amount={pages} active={activePage} />
        ) : type === 'end' ? (
          <FourPagBtns amount={pages} active={activePage} dots={'end'} />
        ) : null}
      </div>
    </div>
  );
};

const FourPagBtns = React.memo(({ dots, amount, active }) => {
  const intsArr = useMemo(() => {
    return dots === 'start'
      ? [1, 2, 3, 'dots', amount]
      : [1, 'dots', amount - 2, amount - 1, amount];
  }, [active, amount]);

  return (
    <>
      {intsArr.map((int) => {
        if (typeof int === 'number')
          return (
            <PagBtn to={'/catalog'} key={int} page={int} active={int === active} data-page={int} />
          );
        else return <span key={int}>...</span>;
      })}
    </>
  );
});

const FivePagBtns = React.memo(({ amount, active }) => {
  const intsArr = useMemo(() => {
    const dots =
      amount > 5 && active === 3
        ? 'start'
        : amount > 5 && active + 2 === amount
        ? 'end'
        : amount > 5
        ? 'middle'
        : 'none';

    return dots === 'start'
      ? [1, active - 1, active, active + 1, 'dots', amount]
      : dots === 'middle'
      ? [1, 'dots-start', active - 1, active, active + 1, 'dots-end', amount]
      : dots === 'end'
      ? [1, 'dots', active - 1, active, active + 1, amount]
      : [1, active - 1, active, active + 1, amount];
  }, [active, amount]);

  return (
    <>
      {intsArr.map((int) => {
        if (typeof int === 'number')
          return (
            <PagBtn to={'/catalog'} key={int} page={int} active={int === active} data-page={int} />
          );
        else return <span key={int}>...</span>;
      })}
    </>
  );
});

const LessStartPagBtns = React.memo(({ activePage, pages }) => {
  return (
    <>
      <PagBtn to={'/catalog'} page={1} active={1 === activePage} data-page={1} />
      {pages >= 2 && <PagBtn to={'/catalog'} page={2} active={2 === activePage} data-page={2} />}
      {pages >= 3 && <PagBtn to={'/catalog'} page={3} active={3 === activePage} data-page={3} />}
      {pages >= 4 && <PagBtn to={'/catalog'} page={4} active={4 === activePage} data-page={4} />}
    </>
  );
});

export default React.memo(Pagination);
