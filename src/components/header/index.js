import BasketSimple from "../../components/basket-simple";
import React, {useCallback} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Menu from "../menu";
import LayoutHeader from "../layout-header";
import { translate } from "../../utils/translate";

function Header(){
  const store = useStore();
  
  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    valLang: state.names.val
  }));
  
  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
  };
  
  const translations = {
    main: translate(select.valLang, 'main'),
    inBasketText: translate(select.valLang, 'inBasketText'),
    item1Name: translate(select.valLang,'item1Name'),
    item2Name: translate(select.valLang,'item2Name'),
    item3Name: translate(select.valLang,'item3Name'),
    goButtonName: translate(select.valLang, 'goButtonName'),
    emptyText: translate(select.valLang, 'emptyText')
  }

  return (
    <LayoutHeader menu={<Menu main={translations.main} link='/'/>}
                  basketSimple={<BasketSimple onOpen={callbacks.openModalBasket}
                                              amount={select.amount}
                                              sum={select.sum}
                                              inBasketText={translations.inBasketText}
                                              item1Name={translations.item1Name}
                                              item2Name={translations.item2Name}
                                              item3Name={translations.item3Name}
                                              goButtonName={translations.goButtonName}
                                              emptyText={translations.emptyText}
                                />}
    
    />
  )
}

export default React.memo(Header);
