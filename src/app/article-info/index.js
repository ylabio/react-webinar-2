import React, {useCallback, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Controls from '../../components/controls';
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
    lang: state.local.lang
  }));

  const callbacks = {
    // Открытие и закрытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    closeModalBasket: useCallback(() => store.get('modals').close(), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Назначение языка интерфейса
    setLang: useCallback(lang => store.get('local').setLang(lang), []),
    // Возврат на первую страницу
    setFirstPage: useCallback(() => store.get('catalog').setPage(1), [])
  };
  // Переводчик статического текста
  const t = (path, amount = null) => store.get('local').translate(path, amount);

  const {id} = useParams();

  useEffect(() => {
    store.get('itemInfo').load(id);
  }, [id]);

  return (
    <Layout head={<h1>{select.info.title}</h1>} curLang={select.lang} setLang={callbacks.setLang}>
      <Controls
        onBasketOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        text={{
          home: t('common.homeLink'),
          empty: t('common.basketEmpty'),
          amount: t('common.basketAmount', select.amount),
          open: t('common.openCart'),
          fullness: t('common.basketFullnessLabel')
        }}
        onHomeClick={callbacks.setFirstPage}
      />
      <ItemInfo
        info={select.info}
        addToBasket={callbacks.addToBasket}
        text={{
          country: t('itemInfo.country'),
          edition: t('itemInfo.edition'),
          category: t('itemInfo.category'),
          price: t('itemInfo.price'),
          add: t('common.add')
        }}
      />
    </Layout>
  );
}

export default React.memo(ArticleInfo);
