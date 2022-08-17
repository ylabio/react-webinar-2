import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import Menu from "../../components/menu";
import '../../styles.css';

function Main() {
  const store = useStore();

  const select = useSelector((state) => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    page: state.catalog.page,
    limit: state.catalog.limit,
    totalPages: state.catalog.totalPages,
  }));

  useEffect(() => {
    store.get('catalog').load(select.limit, (select.page - 1) * select.limit);
  }, [select.page]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    setPage: useCallback(num => store.get('catalog').setPage(num), []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <div className='Head'>
        <Menu pages={[{title: 'Главная', path: '/', id: 1}]}/>
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </div>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination
        currentPage={select.page}
        totalPages={select.totalPages}
        setPage={callbacks.setPage}
      />
    </Layout>
  )
}

export default React.memo(Main);
