import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import './style.css';

function GoodsInfo(props) {

  const cn = bem('GoodsInfo');

  const callbacks = {
    onAdd: useCallback((e) => {props.onAdd(props.info._id);
    }, [props.onAdd, props.info])
  };

  return (
    <div className={cn()}>
      <div className={cn('text')}>
        <span className={cn('text__normal')}>{props.info.description}</span>
      </div>
      <div className={cn('text')}>
        <span className={cn('text__normal')}>{props.countryText}</span>
        <span className={cn('text__bold')}>{props.country}</span>
      </div>
      <div className={cn('text')}>
        <span className={cn('text__normal')}>{props.categoryText}</span>
        <span className={cn('text__bold')}>{props.category}</span>
      </div>
      <div className={cn('text')}>
        <span className={cn('text__normal')}>{props.yearText}</span>
        <span className={cn('text__bold')}>{props.info.edition}</span>
      </div>
      <div className={cn('text')}>
        <span className={cn('text__large')}>{props.priceText}</span>
        <span className={cn('text__large')}>{numberFormat(props.info.price)} ₽</span>
      </div>
      <button className={cn('button')} onClick={callbacks.onAdd}>{props.addText}</button>
    </div>
  )
}

GoodsInfo.propTypes = {
    info: propTypes.object.isRequired,
    lang: propTypes.number.isRequired,
    country: propTypes.string.isRequired,
    category: propTypes.string.isRequired,
    onAdd: propTypes.func,
    countryText: propTypes.string,
    categoryText: propTypes.string,
    yearText: propTypes.string,
    priceText: propTypes.string,
    addText: propTypes.string
}
  
GoodsInfo.defaultProps = {
    onAdd: () => {},
    countryText: 'Страна производитель: ',
    categoryText: 'Категория: ',
    yearText: 'Год :',
    priceText: 'Цена :',
    addText: 'Добавить :'
}

export default React.memo(GoodsInfo);
