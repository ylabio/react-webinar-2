import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback, useEffect, useState} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useParams} from 'react-router';
import ItemDescription from '../../components/item-description';
import {getLocalization} from '../../localization';
import useLanguage from '../../utils/use-language';

function ItemInfo(){
  let { itemId } = useParams()
  const select = useSelector(state => ({
    amount: state.basket.amount,
    items: state.catalog.items,
    sum: state.basket.sum
  }));
  const language = getLocalization(useLanguage())
  console.log('ItemInfo')
  const [itemInfo, setItemInfo] = useState(select.items.find(item => item._id === itemId))
  const store = useStore();

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };
  useEffect(() => {
    if(!itemInfo) {
      const requestURL = `/api/v1/articles/${itemId}?fields=*,maidIn(title),category(title)`
      fetch(requestURL).then(response => response.json())
        .then(json => setItemInfo(json.result))
    }
  }, [itemId])


  return (
    <Layout head={<h1>{itemInfo?.title ?? language.loading}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} sum={select.sum} amount={select.amount}/>
      <ItemDescription item={itemInfo ?? {}} onAddCallback={callbacks.addToBasket}/>
    </Layout>
  )
}

export default React.memo(ItemInfo);
