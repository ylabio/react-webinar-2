import React, { useCallback } from 'react';
import BasketSimple from '../../components/basket-simple';
import Layout from '../../components/layout';
import { useParams } from 'react-router-dom';
import useSelector from '../../utils/use-selector';
import useStore from '../../utils/use-store';
import translator from '../../utils/translator';
import LinkTo from '../../components/link-to';
import DescriptionLayout from '../../components/description-layout';

function Description() {
  console.log('Description');

  const { id } = useParams();
  const store = useStore();

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.description.item,
    currentLanguage: state.language.lang,
  }));

  const dictionary = translator(select.currentLanguage);

  React.useEffect(() => {
    store.get('description').loadById(id);
  }, [id]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавить товар в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
  };

  const renders = {
    toMain: useCallback(
      () => <LinkTo linkTo="/" name={dictionary.main} />,
      [select.currentLanguage]
    ),
  };

  return (
    <Layout head={<h1>{select.item.title}</h1>}>
      <BasketSimple
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        dictionary={dictionary}
        renderLink={renders.toMain}
      />
      <DescriptionLayout
        item={select.item}
        dictionary={dictionary}
        addToBasket={callbacks.addToBasket}
      />
    </Layout>
  );
}

export default React.memo(Description);
