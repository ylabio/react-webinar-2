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
        {props.itemNumber}
      </div>
      <div className={cn('title')}>
        {props.title}
      </div>
      <div className={cn('secondaryInfo')}>
        {props.secondaryInfo}
      </div>
      <Button callback={()=>callbacks.callback(props.item)} >{props.buttonValue}</Button>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object,
  itemNumber: propTypes.number,
  title: propTypes.string,
  secondaryInfo: propTypes.node,
  buttonValue: propTypes.string,
  buttonAction: propTypes.func,
}

Item.defaultProps = {
  buttonAction: () => {}
}

export default React.memo(Item);
