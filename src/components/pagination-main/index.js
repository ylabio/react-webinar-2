import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import './style.css';

function PaginationMain({ currentPage, minPageNumberLimit, maxPageNumberLimit, paginate, quantityPages }){
  const cn = bem('PaginationMain');

  const pageNumbers = [];

  for (let i = 1; i <= quantityPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={cn()}>
      <div 
        className={currentPage === 1 ? cn('active') : cn('number')}
        onClick={() => paginate(1)}>1
      </div>
      {currentPage >= 4 && (<div className={cn('ellipsis')}>...</div>)}
      {
        pageNumbers.map((number) => {
          if (number <= maxPageNumberLimit && number >= minPageNumberLimit) {
            return (<div 
                key={number}
                className={currentPage === number ? cn('active') : cn('number')}
                onClick={() => paginate(number)}>{number}
            </div>)
          } else {
            return null;
          }
        })
      }
      {currentPage <= 10 && <div className={cn('ellipsis')}>...</div>}
      <div 
        className={currentPage === quantityPages ? cn('active') : cn('number')}
        onClick={() => paginate(quantityPages)}>{quantityPages}
      </div>
    </div>
  )
}

PaginationMain.propTypes = {
  currentPage: propTypes.number.isRequired,
  minPageNumberLimit: propTypes.number.isRequired,
  maxPageNumberLimit: propTypes.number.isRequired,
  paginate: propTypes.func.isRequired,
  quantityPages: propTypes.number.isRequired
}

PaginationMain.defaultProps = {
}

export default React.memo(PaginationMain);
