import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import './style.css';
import {Link} from 'react-router-dom'
import { langVars } from '../../utils/localisation';

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
      <Link className={cn('title')} to={props.link}>
        {props.item.title}
      </Link>
      <div className={cn('right')}>
        <div className={cn('price')}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{langVars.item.addBtn[props.lang]}</button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  link: propTypes.string,
  onAdd: propTypes.func,
}

Item.defaultProps = {
  item:{},
  onAdd: () => {},
}

export default React.memo(Item);
