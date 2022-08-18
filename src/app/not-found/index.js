import BasketSimple from '../../components/basket-simple';
import Layout from '../../components/layout';
import React, { useCallback } from 'react';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import './styles.css';
import Header from '../../components/header';
import translate from '../../utils/translate';

function NotFound() {
  const store = useStore();

  const select = useSelector((state) => ({
    article: state.article,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
    changeLanguage: useCallback((language) => store.changeLanguage(language), []),
  };

  return (
    <Layout
      head={<h1>Магазин</h1>}
      changeLanguage={callbacks.changeLanguage}
      language={select.language}
    >
      <Header
        openModalBasket={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        language={select.language}
      />
      <h2 className="NotFound-text">{translate(select.language, 'pageNotFound')}</h2>
    </Layout>
  );
}

export default React.memo(NotFound);
