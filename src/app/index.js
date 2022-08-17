import React, {useContext} from 'react';
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import {languages} from "l10n/languages";
import LanguageSwitcher from "components/language-switcher";
import {Route, Routes} from "react-router-dom";
import Main from "main";
import Product from "product";
import {routes} from "utils/constants/routes";
import {LocalisationContext} from "l10n";
import {translation} from "l10n/strings/translation";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);
  const {lang, switchLanguage} = useContext(LocalisationContext);
  const heading = translation[lang].layout.languageSwitcher.heading


  return (
    <>
      <LanguageSwitcher languages={languages} heading={heading} onClick={switchLanguage}/>
      <Routes>
        <Route path={`/${routes.home}`} element={<Main/>}/>
        <Route path={`/${routes.productInfo}`} element={<Product/>}/>
        <Route path={`/${routes.productInfo}/:id`} element={<Product/>}/>
      </Routes>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
