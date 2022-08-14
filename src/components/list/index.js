import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <>
    {props.items.length ? 
    <div className={cn()}>
      {props.items.map(item =>
      <div key={item.code} className={cn('item')}>
       <Item item={item} {...props} />
      </div>
    )}
    </div>
    :
    <div className={cn('note')}>
    <p className={cn('text')}>Сейчас в корзине ничего нет....</p>
    </div>
}
    </>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
}

List.defaultProps = {
  items: [],
}

export default React.memo(List);