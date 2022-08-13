import Layout from "../../components/layout";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useParams} from 'react-router';
import ItemDescription from '../../components/item-description';
import LayoutHead from '../../components/layout-head';
import BasketWithLink from '../../components/basket-with-link';


function ItemInfo(){
  let { itemId } = useParams()
  const select = useSelector(state => ({
    amount: state.basket.amount,
    items: state.catalog.items,
    language: state.localizations.name,
    sum: state.basket.sum
  }));
  console.log('ItemInfo')
  const [itemInfo, setItemInfo] = useState(select.items.find(item => item._id === itemId))
  const store = useStore();

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    setLanguage: useCallback(lang => store.get('localizations').setLang(lang), [])
  };
  useEffect(() => {
    let newItem = select.items.find(item => item._id === itemId)
    if(newItem && itemInfo._id !== newItem._id) {
      setItemInfo(newItem)
    }
    if(!newItem) {
      const requestURL = `/api/v1/articles/${itemId}?fields=*,maidIn(title),category(title)`
      fetch(requestURL).then(response => response.json())
        .then(json => setItemInfo(json.result))
    }
  }, [itemId])
  const itemDescriptionWords = useMemo(() => store.get('localizations').receive(
    'manufacturer','category','productionYear','price','add','loading'), [select.language])
  const basketWithLinkWords = useMemo(() => store.get('localizations').receive(
    'mainPage', 'inCart', 'goods','empty', 'goCart'), [select.language])
  const placeholderWord = useMemo(() => store.get('localizations').receive(
    'loading').loading, [select.language])
  return (
    <Layout head={<LayoutHead onLanguageChange={callbacks.setLanguage} language={select.language} title={itemInfo?.title ?? placeholderWord}/>}>
      <BasketWithLink onOpen={callbacks.openModalBasket} sum={select.sum} amount={select.amount}
                    words={basketWithLinkWords}/>
      <ItemDescription onAddCallback={callbacks.addToBasket} _id={itemId}
                       description={itemInfo?.description ?? placeholderWord} yearOfProduction={itemInfo?.edition}
                       manufacturer={itemInfo?.maidIn.title ?? placeholderWord} category={itemInfo?.category.title ?? placeholderWord}
                       price={itemInfo?.price ?? 0}
                       words={itemDescriptionWords}/>
    </Layout>
  )
}

export default React.memo(ItemInfo);
