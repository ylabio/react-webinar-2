import React, { useCallback } from 'react';
import Layout from '../../components/layout';
import { useParams } from 'react-router-dom';
import useSelector from '../../utils/use-selector';
import useStore from '../../utils/use-store';
import translator from '../../utils/translator';
import DescriptionLayout from '../../components/description-layout';
import Controls from '../../components/controls';

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

  const links = [{ to: '/', name: dictionary.main }];

  return (
    <Layout head={<h1>{dictionary.store}</h1>}>
      <Controls
        links={links}
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        dictionary={dictionary}
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
