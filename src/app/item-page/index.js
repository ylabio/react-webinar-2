import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, { useCallback, useEffect } from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { useParams } from "react-router";
import ItemDescription from "../../components/item-description";
import Menu from "../../components/Menu";
import { translate } from "../../utils/translate";
import { dBasketSimple, dItemDescription, dMenu } from "../../utils/dictionary";
import MultiLang from "../../components/multiLang";

function ItemPage() {
  console.log('ItemPage');

  const store = useStore();
  const { _id } = useParams();

  useEffect(() => {
    store.get('itemData').loadById(_id);
  }, [_id])

  const itemData = useSelector(state => ({
    description: state.itemData.description,
    maidIn: state.itemData.maidIn?.title,
    maidInCode: state.itemData.maidIn?.code,
    category: state.itemData.category?.title,
    edition: state.itemData.edition,
    price: state.itemData.price,
  }));

  const { title, sum, amount, isLoaded, lang } = useSelector(state => ({
    title: state.itemData.title,
    sum: state.basket.sum,
    amount: state.basket.amount,
    isLoaded: state.params.isLoaded,
    lang: state.params.lang
  }))

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Установить язык страницы
    setLang: useCallback((l) => store.get('params').setLang(l), [lang])
  };

  const menuText = translate(dMenu),
    basketSimpleText = translate(dBasketSimple),
    itemDescriptionText = translate(dItemDescription);

    const renders = {
      head: <>
        <h1>
        {isLoaded ? title : "Loading..."}
        <MultiLang langArr={["RU", "ENG"]} setLang={callbacks.setLang} />
        </h1>
      </>
    }

  return (
    <Layout head={renders.head}>
      <Menu setLang={callbacks.setLang} text={menuText} />
      <BasketSimple onOpen={callbacks.openModalBasket} amount={amount} sum={sum} text={basketSimpleText} />
      <ItemDescription itemData={itemData} onAdd={callbacks.addToBasket} _id={_id} text={itemDescriptionText} />
    </Layout>
  )
}

export default React.memo(ItemPage);
