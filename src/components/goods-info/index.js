import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './style.css';

function GoodsInfo(props) {

  const cn = bem('GoodsInfo');

  const callbacks = {
    onAdd: useCallback((e) => {props.onAdd(props.info._id);
    }, [props.onAdd, props.item])
  };

  return (
    <div className={cn()}>
      <div className={cn('text')}>
        <span className={cn('text__normal')}>{props.info.description}</span>
      </div>
      <div className={cn('text')}>
        <span className={cn('text__normal')}>Страна производитель: </span>
        <span className={cn('text__bold')}>{props.country}</span>
      </div>
      <div className={cn('text')}>
        <span className={cn('text__normal')}>Категория: </span>
        <span className={cn('text__bold')}>{props.category}</span>
      </div>
      <div className={cn('text')}>
        <span className={cn('text__normal')}>Год выпуска: </span>
        <span className={cn('text__bold')}>{props.info.edition}</span>
      </div>
      <div className={cn('text')}>
        <span className={cn('text__large')}>Цена: </span>
        <span className={cn('text__large')}>{numberFormat(props.info.price)} ₽</span>
      </div>
      <button className={cn('button')} onClick={callbacks.onAdd}>Добавить</button>
    </div>
  )
}

GoodsInfo.propTypes = {
    info: propTypes.object.isRequired,
    country: propTypes.string.isRequired,
    category: propTypes.string.isRequired,
    onAdd: propTypes.func,
}
  
GoodsInfo.defaultProps = {
    onAdd: () => {},
}

export default React.memo(GoodsInfo);
