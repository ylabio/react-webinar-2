import React, {useCallback, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import BasketSimple from '../../components/basket-simple';
import ItemInfo from '../../components/item-info';
import Layout from '../../components/layout';
import useSelector from '../../utils/use-selector';
import useStore from '../../utils/use-store';
import './style.css';

function ArticleInfo() {
  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    info: state.itemInfo.info
  }));

  const callbacks = {
    // Открытие и закрытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    closeModalBasket: useCallback(() => store.get('modals').close(), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Назначение id для информации о товаре
    setInfoId: useCallback(_id => store.get('itemInfo').setId(_id), []),
    loadItemInfo: useCallback(_id => store.get('itemInfo').load(_id), [])
  };

  const {id} = useParams();

  useEffect(() => {
    callbacks.setInfoId(id);
    callbacks.loadItemInfo(id);
  }, [id]);

  return (
    <Layout head={<h1>{select.info.title}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <ItemInfo {...select.info} addToBasket={callbacks.addToBasket} />
    </Layout>
  );
}

export default React.memo(ArticleInfo);
