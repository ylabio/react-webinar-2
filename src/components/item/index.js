import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './style.css';
import {Link, useParams} from 'react-router-dom'

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item]),
    addId: useCallback((e) => props.addId(props.item._id), [props.addId])
  };

  return (
   
      <div className={cn()}>
          <div
          className={cn('title')}
          >
          <Link 
           onClick={() => callbacks.addId()}
          to={`/${props.item._type}/${props.item._id}`}
          >
          {props.item.title}</Link>
          </div>
        
        <div className={cn('right')}>
          <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
          <button onClick={callbacks.onAdd}>Добавить</button>
        </div>
      </div>
    
    
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
}

Item.defaultProps = {
  onAdd: () => {}
}

export default React.memo(Item);
