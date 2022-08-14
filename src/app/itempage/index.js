import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../utils/use-store';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { getCategoryById, getCountryById } from '../../utils/axios/requests';
import numberFormat from '../../utils/numberFormat';

function ItemPage({ setTitle }) {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [country, setCountry] = useState({});
  const [category, setCategory] = useState({});

  const cn = bem('Itempage');

  const store = useStore();

  const callbacks = {
    loadItemById: useCallback((id) => store.get('catalog').getItemById(id)),
    addToBasket: useCallback(() => {
      if (item._id) {
        console.log(item._id);
        store.get('basket').addToBasket(item._id);
      }
    }, [item]),
  };

  useEffect(() => {
    async function getItem() {
      setItem(await callbacks.loadItemById(id).then((responce) => responce));
    }
    getItem();
  }, []);

  useEffect(() => {
    if (item.title) {
      setTitle(item.title);
    }
    async function getCountry() {
      if (item.maidIn) {
        setCountry(await getCountryById(item.maidIn._id).then((responce) => responce.result));
      }
    }
    async function getCategory() {
      if (item.category) {
        setCategory(await getCategoryById(item.category._id).then((responce) => responce.result));
      }
    }

    getCountry();
    getCategory();
  }, [item]);

  return (
    item && (
      <div className={cn()}>
        <div className={cn('description')}>{item.description}</div>
        <div className={cn('info-wrapper')}>
          Страна производитель:{' '}
          <div className={cn('info')}>{` ${country.title} (${country.code})`}</div>
        </div>
        <div className={cn('info-wrapper')}>
          Категория:<div className={cn('info')}>{` ${category.title}`}</div>
        </div>
        <div className={cn('price')}>Цена: {numberFormat(item.price)} ₽</div>
        <button onClick={() => callbacks.addToBasket()}>Добавить</button>
      </div>
    )
  );
}

export default React.memo(ItemPage);
