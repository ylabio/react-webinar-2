import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import lang  from "../../utils/dictionary";
import {useParams} from "react-router-dom";
import ChangeLang from "../../components/change-lang";

function Main(){

  console.log('Main');

  const store = useStore();
  const params = useParams();

  useEffect(() => {
    store.get('catalog').load();
  }, []);

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    params: state.catalog.params,
    count: state.catalog.count,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Переход по страницам
    onPaginate: useCallback(page => store.get('catalog').load({page}), []),
    translate: useCallback((language, word) => lang(language, word), [params.lang])
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} link={`/${params.lang || 'ru'}/${item._id}`}/>, []),
  };
  //Пора декомпозировать)
  const options = {
    menuItems: [
      {key: 1, title: `${callbacks.translate(params.lang, 'Main')}`, link: `/${params.lang || 'ru' }/`},
    ]
  };

  return (
    <Layout head={<h1>{callbacks.translate(params.lang, 'store')}</h1>}>
      <ChangeLang />
      <BasketSimple lang={params.lang} onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum} options={options.menuItems} tnslt={callbacks.translate}/>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination
        page={select.params.page}
        limit={select.params.limit}
        count={select.count}
        onChange={callbacks.onPaginate}
      />
    </Layout>
  )
}

export default React.memo(Main);
