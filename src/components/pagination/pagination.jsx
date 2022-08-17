import React, { useState } from 'react';
import propTypes from 'prop-types';
import {PaginationRender} from './pagination-render';
import { paginationCounter } from './../../utils/pagination';
import { useEffect } from 'react';
const Pagination = ({ currentPage, pagesCount, onPageChange }) => {


  const changePage = (p) => {
    onPageChange(p)
  }
  const [paginationRange, setPaginationRange] = useState([])

  useEffect(() => {
    setPaginationRange(paginationCounter(pagesCount, currentPage))
  }, [pagesCount, currentPage])

  return (
    <>
      <div>
        <PaginationRender
        currentPage={currentPage}
        paginationRange={paginationRange}
        changePage={changePage}
        />
      </div>
    </>
  )
}

Pagination.propTypes = {
  page: propTypes.number.isRequired,
  pagesCount: propTypes.number.isRequired,
}

Pagination.defaultProps = {
  page: 1,
  pagesCount: 1,
}

export default React.memo(Pagination);