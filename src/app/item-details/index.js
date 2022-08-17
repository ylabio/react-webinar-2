import React, {useCallback, useEffect} from 'react';
import {cn as bem} from '@bem-react/classname';
import {useParams} from 'react-router-dom';
import useSelector from '../../utils/use-selector';
import ItemCard from '../../components/item-card';
import Layout from '../../components/layout';
import BasketSimple from '../../components/basket-simple';
import useStore from '../../utils/use-store';
import Navbar from '../../components/navbar';

function ItemDetails() {
  console.log('ItemDetails');
  const cn = bem('ItemDetails');

  const params = useParams();
  const store = useStore();

  useEffect(() => {
    store.get('itemDetails').loadItem(params.itemId);
    store.get('modals').close();
  }, [params.itemId]);

  const select = useSelector(state => ({
    sum: state.basket.sum,
    amount: state.basket.amount,
    selectedItem: state.itemDetails.selectedItem
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), [])
  };

  return (
    <div className={cn()}>
      <Layout head={<h1>{select.selectedItem?.title}</h1>}>
        <Navbar />
        <BasketSimple
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
        <ItemCard
          description={select.selectedItem.description}
          originCountry={select.selectedItem?.maidIn?.title}
          countryCode={select.selectedItem?.maidIn?.code}
          category={select.selectedItem?.category?.title}
          yearOfProduction={select.selectedItem?.edition}
          price={select.selectedItem?.price}
          onAdd={() => {
            callbacks.addToBasket(select.selectedItem['_id']);
          }}
        />
      </Layout>
    </div>
  );
}

export default React.memo(ItemDetails);
