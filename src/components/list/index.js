import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List(props) {
  const cn = bem('List');
  const emptyItems = props.items?.length <= 0;
  return (
    <div className={cn()}>
    {emptyItems ? (
      <span className={cn('empty')}>Пусто</span>
    ) : ( 
      props.items.map(item => (
        <div key={item.code} className={cn('item')}>
          <Item 
             item={item} 
             sum={props.sum}
             deleteLogic={props.deleteLogic}
             addLogic={props.addLogic}
             cardItem={props.cardItem}
          />
        </div>
      )
    ))}
      {!emptyItems && props.cardItem ? <div className={cn('total')}>
        <span>Итого</span>
        <span className={cn('total_price')}>{props?.sum} &#8381;</span>
      </div> : null}
  </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  cardItem: propTypes.bool,
  sum: propTypes.number,
  deleteLogic:propTypes.func,
}

List.defaultProps = {
  items: [],
  onItemDelete: () => {}
}

export default React.memo(List);
