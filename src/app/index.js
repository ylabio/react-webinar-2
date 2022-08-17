import React, {useCallback, useEffect, useState} from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";
import { Route, Routes } from 'react-router-dom';
import InfoPage from '../pages/info-page';
import NotFound from '../pages/not-found';
import { useNavigate, useSearchParams  } from "react-router-dom";

const withLoadAppState = (Component) => () => {
  useEffect(() => {
    console.log('app started')
  }, []);

  return <Component />
}

const LoadAppState = (props) => {
  // const [searchParams] = useSearchParams();
  // const currentPage = +searchParams.get('page') || 1;

  // const store = useStore();

  // const select = useSelector((state) => ({
  //   limit: state.catalog.limit,
  //   currentPage: state.catalog.currentPage
  // }))

  // const callbacks = {
  //   getItem: useCallback(() => {
  //     const skip = (currentPage - 1) * select.limit;
  //     store.get('catalog').load(select.limit, skip)
  //   }, [currentPage]),
  // }

  // useEffect(() => {
  //   callbacks.getItem();
  //   console.log('app started')
  // }, [currentPage]);

  return <>{props.children}</>
}

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');
  const modal = useSelector(state => state.modals.name);

  return (
    <LoadAppState>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='product/:id' element={<InfoPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {modal === 'basket' && <Basket/>}
    </LoadAppState>
  );
}

export default React.memo(withLoadAppState(App));
