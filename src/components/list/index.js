import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>{props.list.map(item =>
      <div key={item.code} className={cn('item')}>
        <Item item={item} onClick={props.onClick} actionName={props.actionName} />
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  onClick: propTypes.func,
  actionName: propTypes.string,
  list: propTypes.arrayOf(propTypes.object).isRequired
}

List.defaultProps = {
  actionName: 'Добавить',
  onClick: () => { }
}

export default React.memo(List);
