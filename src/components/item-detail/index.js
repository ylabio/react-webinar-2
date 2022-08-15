import React, {useCallback, useEffect} from 'react';
import {cn as bem} from "@bem-react/classname";
import {useParams} from "react-router-dom"
import './styles.css';
import BasketSimple from '../../components/basket-simple';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import Layout from '../layout';
import numberFormat from "../../utils/numberFormat";

function ItemDetail() {
  const cn = bem('ItemDetail');
  const {id} = useParams();
  
  const store = useStore();
  const item = store.getState().catalog.items.find((item) => item._id === id);
  useEffect(()=>{
    store.get('itemdetail').load(id);
    store.get('modals').close()
  },[id]);
  
  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    
    onAdd: useCallback((e) => store.get('basket').addToBasket(item._id), [])
  };
  

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    country: state.itemdetail.country,
    category: state.itemdetail.category,
    item: state.itemdetail.item
  }));

  return (
    <>
      <Layout head={<h1>{select.item?.title}</h1>}>
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
        <div className={cn()}>
          <div className={cn('content')}>
            <div className={cn('description')}>
              {select.item?.description}
            </div>
            <div className={cn('country')}>
              Страна производителя: <strong>{select.country?.title + ' ( ' + select.country?.code + ')'} </strong>
            </div>
            <div className={cn('category')}>
              Категория: <strong>{select.category?.title} </strong>
            </div>
            <div className={cn('edition')}>
              Год выпуска: <strong>{select.item?.edition} </strong>
            </div>
            <div className={cn('price')}>
              <h1>Цена: {numberFormat(select.item?.price)} ₽</h1> 
            </div>
            <button onClick={callbacks.onAdd}>Добавить</button>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default React.memo(ItemDetail);
