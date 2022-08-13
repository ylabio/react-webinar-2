import List from "../../components/list";
import React, {useCallback, useEffect} from "react";
import BasketTotal from "../../components/basket-total";
import LayoutModal from "../../components/layout-modal";
import ItemBasket from "../../components/item-basket";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import LayoutSpinner from "../../components/layout-spinner";
import getTranslation from "../../utils/getTranslation";
import translations from '../../shared/data/translations'

function Basket(){
  const store = useStore();

  const select = useSelector(state => ({
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    basketLang: state.basket.basketLang,
    isFetching: state.basket.isFetching,
    language: state.language.language,
  }));

  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => store.get('modals').close(), []),
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.get('basket').removeFromBasket(_id), [])
  };

  const renders = {
    itemBasket: useCallback(item => <ItemBasket 
      item={item} 
      onRemove={callbacks.removeFromBasket}
      closeModal={callbacks.closeModal} 
      lang={select.language}
      translationData={{
        remove: getTranslation(
          select.language,
          translations.html_elements.button.remove
        )
      }}
    />, 
    []),
  }

  useEffect(() => {
    const ids = select.items.map(item => ({
      id: item._id,
      amount: item.amount,
    }));
  
    store.get('basket').refreshGoods(ids);
  }, [])

  return ( 
    <LayoutModal 
      translationData={{
        title:  getTranslation(
          select.language,
          translations.components.Basket.title),
        close: getTranslation(
          select.language,
          translations.html_elements.button.close
        ),
      }}
     onClose={callbacks.closeModal}>
      <LayoutSpinner 
        isFetching={select.isFetching}
        color='#FA2FB5'
      >
        <List items={select.items} renderItem={renders.itemBasket} />
      </LayoutSpinner>
      <BasketTotal 
        sum={select.sum} 
        lang={select.language}
        translationData={{
          total: getTranslation(
            select.language,
            translations.components.BasketTotal.total
          )
        }} 
      />
    </LayoutModal>
  )
}

export default React.memo(Basket);
