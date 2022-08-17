import React, { useCallback, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Preloader from '../preloader';

function Pagination(props) {
  const cn = bem('Pagination');

  console.log('Pagination');

  useEffect(() => {
    props.setInitialPages();
  }, []);

  const callbacks = {
    setPagination: useCallback(
      e => {
        const target =
          e.target.textContent === '...'
            ? props.currentPage
            : +e.target.textContent;
        if (!(target === props.currentPage)) {
          props.setPagination(target);
        }
      },
      [props.setPagination, props.currentPage]
    ),
  };

  return (
    <ul className={cn()}>
      {props.pages.map((item, index) => (
        <li
          key={index}
          className={cn(
            item === props.currentPage
              ? 'page_current'
              : item === '...'
              ? 'page_dots'
              : 'page'
          )}
          onClick={callbacks.setPagination}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

Pagination.propTypes = {
  setInitialPages: propTypes.func.isRequired,
  setPagination: propTypes.func.isRequired,
  currentPage: propTypes.number.isRequired,
  pages: propTypes.array,
};

Pagination.defaultProps = {
  pages: [],
};

export default React.memo(Pagination);
