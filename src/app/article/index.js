import React, {useCallback, useEffect} from "react";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import GoodsInfo from "../../components/goods-info";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Article(){

  console.log('Article');

  const store = useStore();

  const select = useSelector(state => ({
    info: state.article.goods,
    country: state.article.country,
    category: state.article.category,
    amount: state.basket.amount,
    sum: state.basket.sum,
    dictionary: state.language.items,
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

  useEffect(() => {
    store.get('article').load();
  }, [])

  return (
    <Layout head={<h1>{select.info.title}</h1>}
            setLang={callbacks.setLang}
            change={select.dictionary.change[select.lang]}>
      <BasketSimple onOpen={callbacks.openModalBasket} 
                    amount={select.amount} 
                    sum={select.sum} 
                    lang={select.lang} 
                    dictionary={select.dictionary}
                    skipPage={select.skipPage}/>
      <GoodsInfo info={select.info}  
                 country={select.country} 
                 category={select.category}  
                 onAdd={callbacks.addToBasket}
                 lang={select.lang} 
                 dictionary={select.dictionary}/>
    </Layout>
  )
}

export default React.memo(Article);
