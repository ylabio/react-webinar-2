import React, { useCallback, useEffect } from "react";
import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import Product from "./product";
import { useParams } from 'react-router-dom';
import Navigation from "../../components/navigation";
import Container from "../../components/container";
import { Translate, useTranslation } from "../../utils/translate";
import SelectLang from "../../components/select-lang";

function PageInfo() {
  const { id } = useParams();

  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    info: state.product.info,
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    addToBasket: useCallback(() => store.get('basket').addToBasket(id), [id]),
  };

  const [ t, setLocale ] = useTranslation();

  useEffect(() => {
    store.get('product').getInfo(id);
  }, [id]);

  return (
    <Layout head={<Container><h1>{select.info.title}</h1><SelectLang onChange={setLocale} /></Container>}>
      <Container>
        <Navigation t={t} />
        <BasketSimple t={t} onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </Container>
      <Product t={t} info={select.info} addToBasket={callbacks.addToBasket} />
    </Layout>
  )
}

export default React.memo(PageInfo);
