import React, {useEffect, useCallback} from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import numberFormat from '../../utils/numberFormat'
import './style.css';
import useStore from '../../utils/use-store';



function ProductPage(props) {
  const cn = bem('product_page');

  console.log('Product_Page');
  
  const item = props.item

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.item._id), [props.onAdd, props.item]),
  };
  const store = useStore();
  

  useEffect(() => {
    store.get('item_page').loadItem(store.state.item_page._id)
  }, [])


  return (
    <div className={cn()}> 
        <p> {item.description}</p> 
        <p> Страна производитель: <span>{item.maidIn && item.maidIn.title}</span></p>
        <p> Категория: <span>{item.category && item.category.title}</span></p>
        <p> Год выпуска: <span>{item.edition}</span></p> 
        <p> <span>Цена: {numberFormat(item.price)} ₽</span> </p> 
        <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  )

}

ProductPage.propTypes = {
  onAdd: propTypes.func,
  items: propTypes.arrayOf(propTypes.object).isRequired,
}

ProductPage.defaultProps = {
  items: [],
  onAdd: () => {}
}

export default React.memo(ProductPage);
