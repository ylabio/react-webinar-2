import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import {cn as bem} from "@bem-react/classname";
import 'style.css';
import useSelector from '../../utils/use-selector';

function Page({addToBasket}) {
  const cn = bem('Page');
 
  const item = JSON.parse(sessionStorage.getItem('item'));

  const select = useSelector(state => ({
    addButtonName: state.names.names.addButtonName,
  }));

  const callbacks = {
    addToBasket: useCallback((e) => addToBasket(item._id), [addToBasket, item])
  };

  return (
    <div className={cn()}>
      {item&&<>
               <div className={cn('description')}>
                 {item.description}
               </div>
               <div className={cn('country')}>
                 Страна производитель:<strong> {item.maidIn.title} ({item.maidIn.code})</strong>
               </div>
               <div className={cn('category')}>
                 Категория:<strong> {item.category.title}</strong>
               </div>
               <div className={cn('edition')}>
                 Год выпуска:<strong> {item.edition}</strong>
               </div>
               <div className={cn('price')}><strong>
                 Цена: {numberFormat(item.price || 0)} ₽</strong>
               </div>
               <div className={cn('actions')}>
                 <button onClick={callbacks.addToBasket}>{select.addButtonName}</button>
               </div>
             </>       
      }
    </div>
  )
}

Page.propTypes = {
  addToBasket: propTypes.func.isRequired
}

export default React.memo(Page);
