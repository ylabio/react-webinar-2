import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>{props.items.map(item =>
      <div key={item.code} className={cn('item')}>
        {/* Убрал onSelect */}
        {<Item item={item} reUse={props.reUse ? props.reUse : false} onAddBasket={props.onAddBasket} onDelete={props.onItemDelete} />}
      </div>
    )}
    </div>
  )
}
// Может и надо, я незнаю
List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  // Ненадо
  // onItemSelect: propTypes.func,
  onItemDelete: propTypes.func
}

List.defaultProps = {
  items: [],
  // Ненадо пока
  // onItemSelect: () => {},
  onItemDelete: () => { }
}

export default React.memo(List);
