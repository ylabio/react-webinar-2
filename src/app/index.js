import React, {useCallback, useEffect} from 'react';
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import {Routes, Route} from 'react-router-dom';
import useStore from '../utils/use-store';
import ItemPage from '../components/item-page';

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {
  console.log('App');
  const store = useStore();

  useEffect(() => {
    store.get('catalog').load();
  }, [])

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    //смена страницы
    changePage: useCallback(pageNumber => store.get('catalog').load(pageNumber), []),
    //Загрузка варианта пагинации
    pagination: useCallback(()=> store.get('catalog').pagination(), []),
  };

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    modal: state.modals.name,
    items: state.catalog.items,
  }));


  return (
    <>
    {select.modal === 'basket' && <Basket/>}
    <Routes>
      <Route path='/' element={<Main callbacks={callbacks} select={select}/>} />
      <Route path=":id" element={<ItemPage callbacks={callbacks} select={select}/>} />
    </Routes>
    </>
  );
}

export default React.memo(App);
