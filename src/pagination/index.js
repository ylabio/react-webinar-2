import React, {useCallback, useState} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";

function Pagination() {
  const cn = bem('Pagination');
  const store = useStore();
  const dots = '...';

  const select = useSelector(state => ({
    activePage: state.catalog.activePage,
    numOfPages: state.catalog.numOfPages,
  }));

  const [pages, setPages] = useState([1, 2, 3, dots, select.numOfPages]);

  const callbacks = {
    // Добавление в корзину
    changePage: useCallback(nPage => {
        store.get('catalog').load(nPage);

        if(nPage === 1 || nPage === 2 && pages !== [1, 2, 3, dots, select.numOfPages])
          setPages([1, 2, 3, dots, select.numOfPages]);
        else if(nPage === 3)
          setPages([1, 2, 3, 4, dots, select.numOfPages]);
        else
          setPages([1, dots, nPage - 1, nPage, nPage + 1, dots, select.numOfPages]);

        if(nPage === select.numOfPages)
          setPages([1, dots, nPage - 2, nPage - 1, select.numOfPages]);
        else if(nPage === select.numOfPages - 1)
          setPages([1, dots, nPage - 1, nPage, select.numOfPages]);
      }, []),
  }

  return (
    <ul className={cn('button-list')}>
      {pages.map((page, index) => {
        return(
          <li key={index}>
            {page !== '...' ?
              <button className={cn('button', {active: page === select.activePage})}
                      onClick={(e) => {e.stopPropagation(); callbacks.changePage(page)}}>
                {page}
              </button> :
              <span>{page}</span>}
          </li>
        )
      })}
    </ul>
  )
}

export default React.memo(Pagination);
