import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStore from "../../utils/use-store";
import Error from '../../components/error';
import Loading from '../../components/loading';
import './style.css';

const Product = () => {
  const store = useStore();
  const productId = useParams().id;

  const [fetchState, setFetchState] = useState('pending'); // 'error' || 'ok'
  const [data, setData] = useState({});

  const addToCart = () => store.get('basket').addToCart(data);
  // имеющийся addToBasket() не работал тк брал данные из store со всеми товарами, но в каталоге всё ещё работает

  useEffect(() => {
    store.get('modals').close();
    fetch(`/api/v1/articles/${productId}?fields=*,maidIn(title,code),category(title)`)
      .then(res => {
        if (res.ok) return res.json()
        else throw new Error(res.status + ' ' + res.statusText);
      })
      .then(json => {
        setFetchState('ok');
        setData(json.result);
      })
      .catch(err => {
        setFetchState('error');
        console.error('pages/product:', err);
      });
  }, [productId]);

  return (fetchState === 'pending'
    ? <Loading />
    : fetchState === 'error'
      ? <Error />
      : <div className='product'>
          <p>{data.description}</p>
          <p>Страна производитель: <b>{`${data.maidIn.title} (${data.maidIn.code})`}</b></p>
          <p>Категория: <b>{data.category.title}</b></p>
          <p>Год выпуска: <b>{data.edition}</b></p>
          <p className='product__price'>{`Цена: ${data.price } ₽`}</p>
          <button onClick={addToCart}>Добавить</button>
        </div>
  );
}

export default React.memo(Product);