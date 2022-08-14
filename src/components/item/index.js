import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {Link} from 'react-router-dom'
import numberFormat from "../../utils/number-format";
import './style.css';
import { translate } from '../../utils/translate';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item])
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>*/}
      {/*  {props.item._id}*/}
      {/*</div>*/}
      <div className={cn('title')}>
        <Link to={`/article/${props.item._id}`}>
          {props.item.title}
        </Link>
      </div>      
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{translate(props.language, 'Add')}</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  language: propTypes.string,
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
}

Item.defaultProps = {
  language: 'RU',
  onAdd: () => {},
}

export default React.memo(Item);
