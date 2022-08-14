import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import ListPagination from "../list-pagination";

function List({items, renderItem, paginationData}) {
  const cn = bem('List');
  return (
    <>
      <div className={cn()}>{items.map(item =>
        <div key={item._id} className={cn('item')}>
          {renderItem(item)}
        </div>
      )}
      </div>
      <ListPagination currentPage={paginationData.currentPage} switchPage={paginationData.switchPage} totalItems={paginationData.totalItems}/>
    </>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  renderItem: propTypes.func
}

List.defaultProps = {
  items: [],
  renderItem: (item) => {
    return item.toString()
  }
}

export default React.memo(List);
