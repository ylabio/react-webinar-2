import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import getPagesArray from '../../utils/get-pages-array';
import counter from '../../utils/counter';
import './style.css';

function Pagination (props) {
  const cn = bem('Pagination');
  
  const pagesArray = getPagesArray(props.page, props.totalPages);

  return (
    <div className={cn()}>
      {pagesArray.map((elem) => (
        <span key={counter()}
              className={elem === props.page ? cn('page') + ' ' + cn('page-current') : elem === "..." ? cn('dotted') : cn('page')}
              onClick={elem !== props.page && elem !== "..." ? () => props.changePage(elem) : null}
        >
          {elem}
        </span>
      ))}
    </div>
  );
};

Pagination.propTypes = {
  page: propTypes.number.isRequired,
  totalPages: propTypes.number.isRequired,
  changePage: propTypes.func.isRequired
}

export default React.memo(Pagination);