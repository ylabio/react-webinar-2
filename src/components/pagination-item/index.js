import React, {useCallback} from 'react'
import propTypes from "prop-types";
import './style.css'

function PaginationItem(props) {
  const callbacks = {
    loadPage: useCallback(() => {
      props.loadPage(props.pageNum);
    }, [props.loadPage])
  };
  const isActive = props.activePage === props.pageNum 

  return (
    <span
      className={`PaginationItem${isActive ? ' PaginationItem_active' : ''}`} 
      // колбек должен срабатывать только для неактивных айтемов
      onClick={!isActive ? callbacks.loadPage : () => {}}
    >
      {props.pageNum} 
    </span>
  )
}

export default PaginationItem

PaginationItem.propTypes = {
  activePage: propTypes.number.isRequired,
  pageNum: propTypes.number.isRequired,
  loadPage: propTypes.func,
}

PaginationItem.defaultProps = {
  loadPage: () => {}
}