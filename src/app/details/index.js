import React, { useCallback, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import BasketSimple from "../../components/basket-simple";
import ItemDetails from '../../components/item-details';
import Layout from "../../components/layout";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";

function Details(props) {

  const { id } = useParams();
  const store = useStore();
  const [info, setInfo] = useState(null);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  // Подробности по итему используются только здесь, вытаскиваем через промисы
  useEffect(() => {
    fetch(`api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`)
      .then(response => response.json()
        .then(json => setInfo(json.result))
      )
  }, [id]);

  //console.log("Deatails for item " + id + " :", info);
  //if (!info) return null;

  return (
    <Layout head={<h1>{info?.title}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      {info ? <ItemDetails onAdd={callbacks.addToBasket} info={info} /> : null}
    </Layout>
  );
};

export default React.memo(Details);