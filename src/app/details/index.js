import React, { useCallback, useEffect } from "react";
import { useParams } from 'react-router-dom';
import BasketSimple from "../../components/basket-simple";
import ItemDetails from '../../components/item-details';
import LanguageChooser from "../../components/lang-chooser";
import Layout from "../../components/layout";
import Menu from "../../components/menu";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";

function Details(props) {

  const { id } = useParams();
  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    items: state.catalog.items,
    info: state.item.fields,
    lang: state.localization.lang
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Переключение языка
    switchLanguage: useCallback(ln => store.get('localization').setLanguage(ln), [])
  };

  // Подробности по итему
  useEffect(() => {
    /* fetch(`api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`)
      .then(response => response.json()
        .then(json => { setInfo(json.result); })) */

    store.get('item').load(id);
  }, [id]);

  return (
    <Layout head={<h1>{select.info?.title}</h1>}>
      <LanguageChooser lnagID={select.lang} onSelect={callbacks.switchLanguage}/>
      <Menu/>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      {select.info?.title ? <ItemDetails onAdd={callbacks.addToBasket} info={select.info} /> : null}
    </Layout>
  );
};

export default React.memo(Details);