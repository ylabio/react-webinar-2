import BasketSimple from '../../components/basket-simple';
import List from '../../components/list';
import Layout from '../../components/layout';
import React, { useCallback, useEffect } from 'react';
import Item from '../../components/item';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import Pagination from '../../components/pagination';
import LanguageButtons from '../../components/languageButtons';

function Main({ setLanguage, language, words }) {
  const store = useStore();
  const [page, setPage] = React.useState(1);
  const itemsLimit = 10;

  useEffect(() => {
    store.get('catalog').load(itemsLimit, (page - 1) * itemsLimit);
  }, [page]);

  const select = useSelector((state) => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalAmount: state.catalog.totalAmount,
  }));
  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
    languageRussian: useCallback(() => setLanguage('ru')),
    languageEnglish: useCallback(() => setLanguage('eng')),
  };

  const renders = {
    item: useCallback(
      (item) => (
        <Item language={language} words={words} item={item} onAdd={callbacks.addToBasket} />
      ),
      [language],
    ),
  };

  return (
    <Layout
      language={<LanguageButtons ru={callbacks.languageRussian} eng={callbacks.languageEnglish} />}
      head={<h1>{language == 'ru' ? words.ru.mainName : words.eng.mainName}</h1>}>
      <BasketSimple
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        language={language}
        words={words}
      />
      <List items={select.items} renderItem={renders.item} />
      <Pagination
        currentPage={page}
        itemsLimit={itemsLimit}
        amount={select.totalAmount}
        setPage={setPage}
      />
    </Layout>
  );
}

export default React.memo(Main);
