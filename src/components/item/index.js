import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import Button from './../button/index';

function Item(props) {
  const cn = bem('Item');

  const callbacks = {
    callback: useCallback(item => {
      props.buttonAction(item);
    }, [props.buttonAction]),
  };

  return (
    <div className={cn()}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('secondaryInfo')}>
        <div>{(props.item.price).toLocaleString('ru-RU',{style:'currency', currency:'RUB',maximumFractionDigits: 0})}</div>
      </div>
      <Button callback={()=>callbacks.callback(props.item)} >Добавить</Button>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  buttonAction: propTypes.func,
}

Item.defaultProps = {
  buttonAction: () => {}
}

export default React.memo(Item);
