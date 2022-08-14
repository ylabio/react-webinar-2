import React, { useState, useEffect, useCallback } from 'react';
import { cn as bem } from '@bem-react/classname';
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import {useParams} from 'react-router-dom';
import numberFormat from '../../utils/number-format';
import Layout from '../layout';
import BasketSimple from '../basket-simple';
import Loader from '../loader'
import './style.css';

function ProductCard() {
  const cn = bem('ProductCard');
  const [product, setProduct] = useState(undefined);
  const { id } = useParams();
  const store = useStore(); 

  /**
   * Запрос на получение данных товара
   */
  useEffect(() => {
    const controller = new AbortController();
    const {signal} = controller.signal;
      const fetchData = async () => {
        try {
          const url = `/api/v1/articles/${id}?fields=*,maidIn(title,code),category(title,code)`;
          const response = await fetch(url, {signal});
          if (response.status >= 200 && response.status < 300) {
            const {result} = await response.json();
            setProduct(result);
          }          
        }
        catch (err) {
          console.log('ProductCard', err);
        }
      }  
    fetchData();
    return () => controller.abort();
  }, [id]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  return (
   <>
      {!product 
      ?  <Loader />
      :
      <Layout head={<h1>{product.title}</h1>}>
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
         <div className={cn()}>
          <ul className={cn('description')}>
            <li>{product.description}</li>
            <li>Страна производитель: <strong>{`${product.maidIn.title} (${product.maidIn.code})`}</strong></li>
            <li>Категория: <strong>{product.category.title}</strong></li>
            <li>Год выпуска: <strong>{product.edition}</strong></li>
            <li className={cn('price')}><strong>Цена: {numberFormat(product.price)} ₽</strong></li>
            <li><button onClick={() => callbacks.addToBasket(id)}>Добавить</button></li>
          </ul>                    
        </div>
      </Layout>}
   </>
  )
}

export default ProductCard;
