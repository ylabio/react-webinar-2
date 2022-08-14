import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './styles.css';

function ItemPagination({ limit, selected, page, onClick }) {
  const cn = bem('ItemPagination');

  const callbacks = {
    onClick: useCallback(() => {
      onClick({
        skip: limit * (page - 1),
        selected: page
      })
    }, [onClick, limit])
  };

  return (
    <li
      className={cn({'selected': selected === page})} 
      onClick={callbacks.onClick}
    >
      {page}
    </li>
  )
}

ItemPagination.propTypes = {
  selected: propTypes.number.isRequired,
  page: propTypes.number.isRequired,
  onClick: propTypes.func.isRequired,
}

ItemPagination.defaultProps = {
}

export default React.memo(ItemPagination);
