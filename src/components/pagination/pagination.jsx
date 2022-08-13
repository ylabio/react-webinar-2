import React, { useState } from 'react';
import propTypes from 'prop-types';
import useSelector from "../../utils/use-selector";
import cls from './pagination.module.css'
import PaginationLogic from './pagination-logic';
const Pagination = (props) => {


  const select = useSelector(state => ({
    pagesCount: state.catalog.pagesCount,
    page: state.catalog.pageSelected,
  }));

  const changePage = (p) => {
    props.onPageChange(p)
  }

  return (
    <>
      <PaginationLogic
      pagesCount={select.pagesCount}
      page={select.page}
      changePage={changePage}
      />
    </>
  )
}

Navigation.propTypes = {
  page: propTypes.number.isRequired,
  pagesCount: propTypes.number.isRequired,
}

Navigation.defaultProps = {
  page: 1,
  pagesCount: 1,
}

export default React.memo(Pagination);