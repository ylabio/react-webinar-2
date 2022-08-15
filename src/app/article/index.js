import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import React, {useCallback} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Page from "../../components/page";
import Preloader from "../../components/preloader";

function Article(){

  console.log('Article');

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    pagesCount: state.catalog.pagesCount,
    page: state.catalog.page,
    loading: state.page.loading,
    addButtonName: state.names.names.addButtonName,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
    // Открытие страницы товара
    pageLoad: useCallback((_id) => store.get('page').pageLoad(_id), []),
    // Изменение языка
    changeLanguage: useCallback((value) => store.get('names').changeLanguage(value), [])
  };
  
  const item = JSON.parse(sessionStorage.getItem('item'));

  return (
    <>  
      <Layout head={!select.loading&&<h1>{item.title}</h1>} changeLanguage={callbacks.changeLanguage}>
        <BasketSimple onOpen={callbacks.openModalBasket} 
                      amount={select.amount}
                      sum={select.sum}
        />
        {select.loading ? 
          <Preloader/>
          :
          <Page addToBasket={callbacks.addToBasket} item={item}/>
        }
      </Layout>
    </>
  )
}

export default React.memo(Article);
