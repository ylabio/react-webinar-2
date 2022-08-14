import React from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import ArticleById from "./article-by-id";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  const modal = useSelector(state => state.modals.name);

  return (
    <>
        <Routes>
            <Route path={'/article/:id'} element={<ArticleById/>}/>
            <Route path={'/main'} element={<Main/>}/>
            <Route path={'*'} element={<Main/>}/> /* чтобы при неправильном пути рендерился Main */
        </Routes>
      {/*<Main/>*/}
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
