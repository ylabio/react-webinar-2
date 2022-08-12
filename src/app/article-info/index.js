import React, {useCallback, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import BasketSimple from '../../components/basket-simple';
import ItemInfo from '../../components/item-info';
import Layout from '../../components/layout';
import useSelector from '../../utils/use-selector';
import useStore from '../../utils/use-store';

function ArticleInfo() {
  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    info: state.itemInfo.info,
    local: state.local.dict[state.local.lang],
    lang: state.local.lang
  }));

  const callbacks = {
    // Открытие и закрытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    closeModalBasket: useCallback(() => store.get('modals').close(), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Назначение id для информации о товаре
    setInfoId: useCallback(_id => store.get('itemInfo').setId(_id), []),
    loadItemInfo: useCallback(_id => store.get('itemInfo').load(_id), []),
    setLang: useCallback(lang => store.get('local').setLang(lang), [])
  };

  const {id} = useParams();

  useEffect(() => {
    callbacks.setInfoId(id);
    callbacks.loadItemInfo(id);
  }, [id]);

  return (
    <Layout head={<h1>{select.info.title}</h1>} curLang={select.lang} setLang={callbacks.setLang}>
      <BasketSimple
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        local={select.local}
      />
      <ItemInfo {...select.info} addToBasket={callbacks.addToBasket} local={select.local} />
    </Layout>
  );
}

export default React.memo(ArticleInfo);
