import React, { useCallback } from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { cn as bem } from "@bem-react/classname";
import './style.css';
import usePagination from "../../utils/use-pagination";
import propTypes from 'prop-types';


function Pagination({ contentPerPage, gapsStyle }) {
  console.log('Pagination');

  const { count } = useSelector(state => ({
    count: state.catalog.count,
  }));
  const {
    page,
    gaps,
    setPage,
    totalPages,
  } = usePagination({
    contentPerPage,
    count
  });

  const cn = bem('Pagination');

  const store = useStore();

  const callbacks = {
    // Открытие корзины
    onClick: useCallback(async (page) => {
      setPage(page);
      await store.get('catalog').load({ limit: contentPerPage, skip: (page - 1) * contentPerPage });
    }, [page, count])
  };

  return (
    <div className={cn()}>
      <div className={cn('rockButton', [cn('button', { ['active']: page === 1 })])}
        onClick={() => callbacks.onClick(1)}>
        1
      </div>
      {gaps.before ?
        <div className={cn('gaps')}>
          {gapsStyle}
        </div> : null}
      {gaps.paginationGroup.map((el) => (
        <div
          onClick={() => callbacks.onClick(el)}
          key={el}
          className={cn('button', { ['active']: page === el })}
        >
          {el}
        </div>
      ))}
      {gaps.after ?
        <div className={cn('gaps')}>
          {gapsStyle}
        </div> : null}
      <div className={cn('rockButton', [cn('button', { ['active']: page === totalPages })])}
        onClick={() => callbacks.onClick(totalPages)}>
        {totalPages}
      </div>
    </div>
  )

}

Pagination.propTypes = {
  contentPerPage: propTypes.number,
  gapsStyle: propTypes.string
}

Pagination.defaultProps = {
  contentPerPage: 10,
  gapsStyle: "..."
}

export default React.memo(Pagination);
