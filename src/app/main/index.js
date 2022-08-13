import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import Spinner from "../../components/spinner";

function Main(){

  console.log('Main');
  const navigate = useNavigate();
  const location = useLocation();
  const {page} = useParams();
  const currentPage = parseInt(page) || 1

  const store = useStore();

  useEffect(() => {
    store.get('catalog').load(parseInt(page) || 1);
  }, [page])

  const select = useSelector(state => ({
    items: state.catalog.items,
    count: state.catalog.count,
    amount: state.basket.amount,
    sum: state.basket.sum,
    loading: state.catalog.loading
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => navigate("/basket", { state: { modal: location } }), [location]),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Переход на страницу каталог
    onPageChange: useCallback(page => navigate(`/page/${page}`), [])
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      {select.loading ? 
        <Spinner /> : 
        <List items={select.items} renderItem={renders.item}/>}
      <Pagination currentPage={currentPage} totalPages={select.count} onPageChange={callbacks.onPageChange} />
    </Layout>
  )
}

export default React.memo(Main);
