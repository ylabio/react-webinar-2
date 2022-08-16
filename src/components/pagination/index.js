import React, {useCallback, useState} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function Pagination(props) {
  const cn = bem('Pagination');
  const dots = '...';

  const [pages, setPages] = useState([1, 2, 3, dots, props.numOfPages]);

  const callbacks = {
    changePage: useCallback(nPage => {
        props.load(nPage);
        if(nPage === 1 || nPage === 2 && pages !== [1, 2, 3, dots, props.numOfPages])
          setPages([1, 2, 3, dots, props.numOfPages]);
        else if(nPage === 3)
          setPages([1, 2, 3, 4, dots, props.numOfPages]);
        else
          setPages([1, dots, nPage - 1, nPage, nPage + 1, dots, props.numOfPages]);

        if(nPage === props.numOfPages)
          setPages([1, dots, nPage - 2, nPage - 1, props.numOfPages]);
        else if(nPage === props.numOfPages - 1)
          setPages([1, dots, nPage - 1, nPage, props.numOfPages]);
      }, []),
  }

  return (
    <ul className={cn('button-list')}>
      {pages.map((page, index) => {
        return(
          <li key={index}>
            {page !== '...' ?
              <button className={cn('button', {active: page === props.activePage})}
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

Pagination.propTypes = {
  activePage: propTypes.number,
  numOfPages: propTypes.number.isRequired,
  load: propTypes.func
}

Pagination.defaultProps = {
}

export default React.memo(Pagination);
