import React, { useState, useEffect } from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import MainPage from "../../pages/main-page";
import ItemPage from "../../pages/item-page/";
import { Route, Routes, Navigate } from "react-router-dom";

function Main(){

  console.log('Main');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const store = useStore();

  const select = useSelector(state => ({
    page: state.paging.currentPage
  }));

  useEffect(() => {
    setLoading(true);
    store.get('catalog').loadItems()
         .then(
           () => setLoading(false),
           () => setError(true)
         );
  }, [select.page]);

  return (
    <Routes>
      <Route path="/" element={<MainPage loading={loading} error={error}/>}/>
      <Route path="/item/:id" element={<ItemPage/>}/>
      <Route path="/*" element={<Navigate to={"/"}/>}/>
    </Routes>
  )
}

export default React.memo(Main);
