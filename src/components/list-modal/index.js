import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import ItemModal from "../item-modal";
import '../list/style.css';

function ListModal(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>{props.items.map(item =>
      <div key={item.code} className={cn('item')}>
        <ItemModal item={item} onDelete={props.onDeleteItems}/>
      </div>
    )}
    </div>
  )
}

ListModal.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
	onDeleteItems: propTypes.func
}

ListModal.defaultProps = {
  items: [],
  onDeleteItems: () => {}
}

export default React.memo(ListModal);
