import React, {useCallback, useEffect} from "react";
import BasketSimple from "../../components/basket-simple";
import LayoutArticle from "../../components/layout-article";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { useParams } from "react-router-dom";
import ItemArticle from "../../components/item-article";

function Article(){

  console.log('Article');

  const store = useStore();
  const params = useParams();

  useEffect(() => {
    store.get('product').getArticle(params.articleID);
  }, [params.articleID])

  const select = useSelector(state => ({
    count: state.catalog.count,
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.product.item,
    category: state.product.category,
    maidIn: state.product.maidIn,
    lang: state.language.lang
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  return (
    <LayoutArticle head={<h1>{select.item.title}</h1>}>
      <BasketSimple 
        onOpen={callbacks.openModalBasket} 
        amount={select.amount} 
        sum={select.sum} 
        lang={select.lang}
      />
      <ItemArticle 
        item={select.item} 
        category={select.category} 
        maidIn={select.maidIn} 
        onAdd={callbacks.addToBasket}
        lang={select.lang}
      />
    </LayoutArticle>
  )
}

export default React.memo(Article);
