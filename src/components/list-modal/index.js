import React from 'react';
import propTypes from 'prop-types';
import ItemModal from "../item-modal";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function ListModal({ basket, onItemDelete }) {
  const cn = bem('ListModal');

  return (
    <div className={cn()}>{basket.map((item, index) =>
      <div key={item.code} className={cn('item')}>
        <ItemModal item={item} index={index} onDelete={onItemDelete}/>
      </div>
    )}
    </div>
  )
}

ListModal.propTypes = {
  basket: propTypes.arrayOf(propTypes.object).isRequired,
  onItemDelete: propTypes.func
}

ListModal.defaultProps = {
  basket: [],
  onItemDelete: () => {}
}

export default React.memo(ListModal);
