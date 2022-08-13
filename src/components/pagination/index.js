import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import useSelector from '../../utils/use-selector';
import './style.css';

function Pagination(props) {
  const cn = bem('Pagination');

  const select = useSelector((state) => ({
    totalPagesCounter: state.catalog.totalPagesCounter,
    currentPage: state.catalog.currentPage,
  }));

  const currentPage = select.currentPage;
  const totalPagesCounter = select.totalPagesCounter;

  const callbacks = {
    onSetPage: useCallback((page) => props.onSetPage(page), []),
  };

  return (
    <div className={cn()}>
      <div className={cn('wrapper')}>
        {currentPage > 2 && (
          <div
            className={cn('select')}
            onClick={() => {
              callbacks.onSetPage(1);
            }}
          >
            1
          </div>
        )}
        {currentPage > 3 && <div className={cn('divider')}>...</div>}
        {currentPage === totalPagesCounter && (
          <div
            className={cn('select')}
            onClick={() => {
              callbacks.onSetPage(currentPage - 2);
            }}
          >
            {currentPage - 2}
          </div>
        )}
        {currentPage !== 1 && (
          <div
            className={cn('select')}
            onClick={() => {
              callbacks.onSetPage(currentPage - 1);
            }}
          >
            {currentPage - 1}
          </div>
        )}
        <div className={cn('selected')}>{currentPage}</div>
        {currentPage < totalPagesCounter - 1 && (
          <div
            className={cn('select')}
            onClick={() => {
              callbacks.onSetPage(currentPage + 1);
            }}
          >
            {currentPage + 1}
          </div>
        )}
        {currentPage < 2 && (
          <div
            className={cn('select')}
            onClick={() => {
              callbacks.onSetPage(currentPage + 2);
            }}
          >
            {currentPage + 2}
          </div>
        )}
        {currentPage < totalPagesCounter - 2 && <div className={cn('divider')}>...</div>}
        {currentPage !== totalPagesCounter && (
          <div
            className={cn('select')}
            onClick={() => {
              callbacks.onSetPage(totalPagesCounter);
            }}
          >
            {totalPagesCounter}
          </div>
        )}
      </div>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: propTypes.number.isRequired,
  totalPagesCounter: propTypes.number.isRequired,
};

Pagination.defaultProps = {
  currentPage: 1,
  totalPagesCounter: 1,
};

export default React.memo(Pagination);
