import React from 'react';
import Basket from "./basket";
import useSelector from "../utils/use-selector";
import {Routing} from "pages";
import {languages} from "l10n/languages";
import LanguageSwitcher from "components/language-switcher";

/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

  console.log('App');

  const modal = useSelector(state => state.modals.name);

  return (
    <>
      <LanguageSwitcher languages={languages}/>
      <Routing/>
      {modal === 'basket' && <Basket/>}
    </>
  );
}

export default React.memo(App);
