import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import PaginationBlock from "../../components/pagination-block";
import Menu from '../../components/menu'




function Main(){

  console.log('Main');

  const store = useStore();

  useEffect(() => {
    store.get('catalog').load(select.num);
  }, [])

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    _id: state.item_page._id,
    item: state.item_page.item,
    count: state.catalog.count,
    load: state.item_page.load,
    num: state.pagination.num
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Добавление id элемента для запроса
    addIdForRequest: useCallback(_id => store.get('item_page').getId(_id), []),
     // Добавление id элемента для запроса
    toLoadItem: useCallback(_id => store.get('item_page').loadItem(_id), []),
    // обнуление состояния
    toNullForItemState: useCallback(() => store.get('item_page').toNull(), []),
    // загрузка всего списка
    toPaginate: useCallback((skip) => store.get('catalog').paginate(skip), []),
    // получение номера страницы
    paginNum: useCallback((num) => store.get('pagination').paginationNumber(num), []), 
  };



  const renders = {
    item: useCallback(item => <Item item={item} link={`/articles/${item._id}`} addId={callbacks.addIdForRequest} onAdd={callbacks.addToBasket}/>, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Menu/>
      <BasketSimple 
        onOpen={callbacks.openModalBasket} 
        toNull={callbacks.toNullForItemState} 
        amount={select.amount} 
        sum={select.sum} 
      />
      <List 
        items={select.items} 
        renderItem={renders.item} 
      />
      <PaginationBlock 
        count={select.count} 
        paginate={callbacks.toPaginate} 
        num={select.num}
        getNum={callbacks.paginNum}
      />
    </Layout>
  )
}

export default React.memo(Main);
