import React, {useEffect} from 'react';
import Main from "./main";
import Basket from "./basket";
import Discription from "./description/index";
import useStore from "../utils/use-store";
import useSelector from "../utils/use-selector";
import { Routes, Route } from 'react-router-dom';

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

  const modal = useSelector(state => state.modals.name);

  return (
    <>
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path='/discription/:id/*' element={<Discription/>}/>
    </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
