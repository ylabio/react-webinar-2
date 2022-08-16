import React, {useCallback, useEffect} from "react";
import {useParams} from "react-router-dom";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import GoodsInfo from "../../components/goods-info";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import dictionary from '../../dictionary';

function Article(){

  console.log('Article');

  const store = useStore();

  const params = useParams();

  const select = useSelector(state => ({
    info: state.article.goods,
    country: state.article.country,
    category: state.article.category,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.lang,
    skipPage: state.pages.skip
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Смена языка
    setLang: useCallback(lang => store.get('language').setLang(lang), [])
  };

  //получаем данные из localStorage, если они есть
  useEffect(() => {
    if ( localStorage.getItem("basket"))
      store.get('basket').setFromStorage(localStorage.getItem("basket"))
  }, [])

  //получаем данные для отображения через API
  useEffect(() => {
    store.get('article').load(params.numb);
  }, [params.numb])

  return (
    <Layout head={<h1>{select.info.title}</h1>}
            setLang={callbacks.setLang}
            urlToPage={'/1'}
            onOpen={callbacks.openModalBasket}
            amount={select.amount} 
            sum={select.sum} 
            lang={select.lang} 
            dictionary={dictionary}
            openText={dictionary.move[select.lang]}
            cartInText={dictionary.cartIn[select.lang]}
            item0={dictionary.item0[select.lang]}
            item1={dictionary.item1[select.lang]}
            item2={dictionary.item2[select.lang]}
            empty={dictionary.empty[select.lang]}
            change={dictionary.change[select.lang]}>
      <GoodsInfo info={select.info}  
                 country={select.country} 
                 category={select.category}  
                 onAdd={callbacks.addToBasket}
                 lang={select.lang} 
                 dictionary={dictionary}
                 countryText={dictionary.countryOforigin[select.lang]}
                 categoryText={dictionary.category[select.lang]}
                 yearText={dictionary.yearOfRelease[select.lang]}
                 priceText={dictionary.price[select.lang]}
                 addText={dictionary.add[select.lang]}/>
    </Layout>
  )
}

export default React.memo(Article);
