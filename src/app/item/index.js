import React, { useCallback, useEffect } from "react"
import { useParams } from "react-router";
import BasketSimple from "../../components/basket-simple"
import ItemInfo from "../../components/item-info";
import Layout from "../../components/layout"
import Loader from "../../components/loader";
import Navigation from "../../components/navigation";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import Basket from "../basket";


function ItemPage() {
  const { pageId } = useParams();
  const store = useStore();
  const select = useSelector(state => ({
    item: state.itemStage.item,
    amount: state.basket.amount,
    sum: state.basket.sum,
    loading: state.itemStage.loading,
    modal: state.modals.name,
    items: state.catalog.items,
  }));
  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Закрытие корзины
    closeModal: useCallback(() => store.get('modals').close(), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
  };

  useEffect(() => {
    callbacks.closeModal()
    store.get('itemStage').load(pageId);
    return function clearState() {
      store.get('itemStage').clear();
    }
  }, [pageId])

  return (
    <>
      <Layout head={<h1>{!select.loading ? select.item ? select.item.title : null : null}</h1>}>
        <Navigation />
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
        {
          !select.loading ?
            <ItemInfo item={select.item} onAdd={callbacks.addToBasket} />
            :
            <Loader />
        }
      </Layout>
      {select.modal === 'basket' && <Basket />}
    </>
  )


}

export default React.memo(ItemPage)
