import React, {useCallback, useEffect, useRef} from 'react';
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
    setInfoId: useCallback(_id => store.get('itemInfo').setId(_id), [])
  };

  const isParams = useRef(false);
  useEffect(() => {
    callbacks.closeModalBasket();
  }, []);

  const {id} = useParams();

  useEffect(() => {
    callbacks.setInfoId(id.toString());
    isParams.current = true;
  }, [id]);

  useEffect(() => {
    if (!isParams.current) {
      store.get('itemInfo').load(select.info._id);
    }
    isParams.current = false;
  }, [select.info._id]);

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <ItemInfo {...select.info} addToBasket={callbacks.addToBasket} />
    </Layout>
  );
}

export default React.memo(ArticleInfo);
