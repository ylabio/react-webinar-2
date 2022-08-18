import React, {useCallback} from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import numberFormat from '../../utils/numberFormat'
import './style.css';
import Loader from '../loader';




function ProductItem(props) {
    const cn = bem('product_item');

    console.log('ProductItem')
    const callbacks = {
      onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item]),
    }
    
    const item = props.item

    return (
        props.loader 
        ? <Loader/>
        : <div className={cn()}> 
            <p> {item?.description}</p> 
            <p> Страна производитель: <span>{item?.maidIn?.title}</span></p>
            <p> Категория: <span>{item?.category?.title}</span></p>
            <p> Год выпуска: <span>{item?.edition}</span></p> 
            <p> <span>Цена: {numberFormat(item?.price)} ₽</span> </p> 
            <button onClick={callbacks.onAdd}>Добавить</button>
          </div>
    )

}

ProductItem.propTypes = {
  onAdd: propTypes.func,
  item: propTypes.object.isRequired,
}

ProductItem.defaultProps = {
  item: {},
  onAdd: () => {}
}

export default React.memo(ProductItem);
