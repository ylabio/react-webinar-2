import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import { useParams } from "react-router-dom";
import Item from "../../components/item";
import Pagination from "../../components/pagination";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import './style.css';
import dictionary from '../../dictionary';

function Main(){
  
  console.log('Main');

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    count: state.catalog.count,
    skipPage: state.pages.skip,
    page: state.pages.page,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.lang
  }));
  
  //получаем номер страницы при переходе
  const param = useParams();
  let pageParam = select.page;
  if (Number(param.page) > 0)
    pageParam = Number(param.page); 
  
  //получаем данные из localStorage, если они есть  
  useEffect(() => {
    if ( localStorage.getItem("basket"))
      store.get('basket').setFromStorage(localStorage.getItem("basket"))
  }, [])

  //обновление информации в зависимости от номера страницы
  useEffect(() => {
    store.get('pages').setPage(pageParam);
  }, [pageParam])
 
  //получаем данные для каталога из API
  useEffect(() => {
    store.get('catalog').load(select.skipPage);
  }, [select.skipPage])

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Смена языка
    setLang: useCallback(lang => store.get('language').setLang(lang), [])
  };

  const renders = {
    item: useCallback(item => <Item item={item} 
                                    onAdd={callbacks.addToBasket}
                                    add={dictionary.add[select.lang]}
                                    skipPage={select.skipPage}
                                    urlTo={'/article/'+item._id}
    />, [select.lang, select.skipPage]),
  }

  return (
    <Layout head={<h1>{dictionary.shop[select.lang]}</h1>} 
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
      <List items={select.items} 
            renderItem={renders.item}
      />
      <Pagination page={select.page} 
                  count={select.count}
      />
    </Layout>
  )
}

export default React.memo(Main);
