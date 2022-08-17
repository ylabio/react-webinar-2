import React, { memo } from "react";
import "./style.css";
import propTypes from "prop-types";

export function Pagination({ page, setPage, pagesAmount }) {
  const currentPage = page / 10 + 1;

  const conditions = {
    firstPage: currentPage > 2,
    prevPrevPage: currentPage > pagesAmount - 1,
    prevPage: currentPage > 1,
    nextPage: currentPage < pagesAmount - 1,
    nextNextPage: currentPage < 2,
    lastPage: currentPage < pagesAmount,
    prevDotted: currentPage > 3,
    nextDotted: currentPage < pagesAmount - 2,
  };

  const callbacks = {
    first: () => setPage(0),
    prevPrevPage: () => setPage(page - 20),
    prevPage: () => setPage(page - 10),
    nextPage: () => setPage(page + 10),
    nextNextPage: () => setPage(page + 20),
    lastPage: () => setPage((pagesAmount - 1) * 10),
  };

  return (
    <div className="Pagination">
      {conditions.firstPage && <button onClick={callbacks.first}>1</button>}

      {conditions.prevDotted && <span className="Pagination__dotted">...</span>}

      {conditions.prevPrevPage && (
        <button onClick={callbacks.prevPrevPage}>{currentPage - 2}</button>
      )}

      {conditions.prevPage && (
        <button onClick={callbacks.prevPage}>{currentPage - 1}</button>
      )}

      <button className="Pagination__button-selected">{currentPage}</button>

      {conditions.nextPage && (
        <button onClick={callbacks.nextPage}>{currentPage + 1}</button>
      )}

      {conditions.nextNextPage && (
        <button onClick={callbacks.nextNextPage}>{currentPage + 2}</button>
      )}

      {conditions.nextDotted && <span className="Pagination__dotted">...</span>}

      {conditions.lastPage && (
        <button onClick={callbacks.lastPage}>{pagesAmount}</button>
      )}
    </div>
  );
}

Pagination.propTypes = {
  page: propTypes.number,
  setPage: propTypes.func,
  pagesAmount: propTypes.number,
};

Pagination.defaultProps = {};

export default memo(Pagination);
