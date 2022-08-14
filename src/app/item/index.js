import React, { useCallback, useEffect } from "react"
import { useLocation } from "react-router";
import BasketSimple from "../../components/basket-simple"
import ItemInfo from "../../components/item-info";
import Layout from "../../components/layout"
import Loader from "../../components/loader";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import Basket from "../basket";


function ItemPage() {
  const location = useLocation();
  const store = useStore();
  const select = useSelector(state => ({
    item: state.itemStage.item,
    amount: state.basket.amount,
    sum: state.basket.sum,
    loading: state.itemStage.loading,
    modal: state.modals.name
  }));
  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Закрытие корзины
    closeModal: useCallback(() => store.get('modals').close(), []),
  };

  useEffect(() => {
    callbacks.closeModal()
    store.get('itemStage').load(location.state);
    return function clearState() {
      store.get('itemStage').clear();
    }
  }, [location.state])



  return (
    <>
      <Layout head={<h1>{!select.loading ? select.item ? select.item.title : null : null}</h1>}>
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
        {
          !select.loading ?
            <ItemInfo item={select.item} />
            :
            <Loader />
        }
      </Layout>
      {select.modal === 'basket' && <Basket />}
    </>
  )


}

export default React.memo(ItemPage)
