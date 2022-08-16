import ItemMenu from "Item-menu";
import React, {useCallback} from 'react';
import {useNavigate} from "react-router-dom";
import useLanguage from "utils/use-language";


function Menu() {
  const navigate = useNavigate();
  const translation = useLanguage()

  const callbacks = {
    onNavigateMainPage: useCallback(() => navigate(`/`), []),
  };

  return (
    <ItemMenu name={translation('home')} onLink={callbacks.onNavigateMainPage}/>
  )
}

export default React.memo(Menu);
