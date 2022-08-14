import React, { useEffect, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';

function Pagination({ itemsPerPage, totalItems, paginate, currentPage}) {
  const cn = bem('Pagination');

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const [arrOfCurrPages, setArrOfCurrButtons] = useState([]);

  useEffect(() => {
    let tempNumberOfPages = [];

    let dots = '...';

    if (currentPage >= 1 && currentPage <= 3) {
      if (currentPage === 2 || currentPage === 3) {
        tempNumberOfPages = [...pageNumbers.slice(0, currentPage + 1), dots, pageNumbers.length];
      } else {
        tempNumberOfPages = [...pageNumbers.slice(0, currentPage + 2), dots, pageNumbers.length];
      }
    } else if (currentPage >= pageNumbers.length - 2 && currentPage <= pageNumbers.length) {
      if (currentPage === pageNumbers.length - 3 || currentPage === pageNumbers.length - 2) {
        tempNumberOfPages = [1, dots, ...pageNumbers.slice(currentPage - 2, currentPage + 2)];
      } else if (currentPage === pageNumbers.length) {
        tempNumberOfPages = [1, dots, ...pageNumbers.slice(currentPage - 3, currentPage + 1)];
      } else {
        tempNumberOfPages = [1, dots, ...pageNumbers.slice(currentPage - 2, currentPage + 1)];
      }
    } else {
      tempNumberOfPages = [
        1,
        dots,
        ...pageNumbers.slice(currentPage - 2, currentPage + 1),
        dots,
        pageNumbers.length,
      ];
    }
    setArrOfCurrButtons(tempNumberOfPages);
  }, [currentPage, totalItems]);
  console.log(currentPage)

  return (
    <div className={cn()}>
      <ul className={cn('ul')}>
        {arrOfCurrPages.map((number, idx) => (
          <div key={idx}>
            {number === '...' ? (
              <li className={cn('li')} style={{ pointerEvents: 'none' }}>
                <div>{number}</div>
              </li>
            ) : (
              <li
                className={`${cn('li')} ${currentPage === number ? cn('active') : ''}`}
                onClick={() => paginate(number)}>
                <div>{number}</div>
              </li>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

    Pagination.propTypes = {
      paginate: propTypes.func,
      totalItems: propTypes.number,
      itemsPerPage: propTypes.number,
      currentPage: propTypes.number,
    };

    Pagination.defaultProps = {
      paginate: () => {},
      totalItems: 0,
      itemsPerPage: 0,
      currentPage: 0
    };

export default React.memo(Pagination);
