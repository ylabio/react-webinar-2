import React, { useCallback } from 'react';
import BasketSimple from '../../components/basket-simple';
import Layout from '../../components/layout';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import { useParams } from 'react-router-dom';
import AboutItem from '../../components/aboutItem';
import LanguageButtons from '../../components/languageButtons';

function ItemInfo({ words, language, setLanguage }) {
  const store = useStore();
  let params = useParams();
  React.useEffect(() => {
    store.get('description').loadItem(params.id);
  }, [params.id]);

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));
  const itemSelect = useSelector((state) => ({
    item: state.description.item,
    title: state.description.title,
    description: state.description.description,
    price: state.description.price,
    madeInTitle: state.description.madeInTitle,
    madeInCode: state.description.madeInCode,
    category: state.description.category,
    edition: state.description.edition,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
    languageRussian: useCallback(() => setLanguage('ru')),
    languageEnglish: useCallback(() => setLanguage('eng')),
  };
  return (
    <Layout
      language={<LanguageButtons ru={callbacks.languageRussian} eng={callbacks.languageEnglish} />}
      head={<h1>{itemSelect.title}</h1>}>
      <BasketSimple
        language={language}
        words={words}
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <AboutItem
        language={language}
        words={words}
        select={itemSelect}
        add={callbacks.addToBasket}
        id={params.id}
      />
    </Layout>
  );
}

export default React.memo(ItemInfo);
