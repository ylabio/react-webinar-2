import React, {useCallback, useState} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Popup from './components/popup';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const[isPopupOpen, setIsPopupOpen] = useState(false);
  
  const callbacks = {  
    onAddToCart: useCallback((code)=> {
      store.addToCartItem(code)
    }, []),
    onPopupOpen: useCallback(()=> {
      setIsPopupOpen(true);   
    }, []),
    onPopupClose: useCallback(()=> {    
      setIsPopupOpen(false);
    }, []),
    onDeleteItemsFromCart: useCallback((code) => {
      store.deleteItemsFromCart(code);
    }, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls cart={store.getState().cart} onPopupOpen={callbacks.onPopupOpen}/>
      <List items={store.getState().items}         
            onItemDelete={callbacks.onDeleteItems}
            onAddToCart={callbacks.onAddToCart}          
      />  
      {isPopupOpen && (
         <Popup title={'Корзина'} onClose={callbacks.onPopupClose}>
         <Cart cartItems={Object.values(store.getState().cart.cartItems)} onDeleteItemsFromCart={callbacks.onDeleteItemsFromCart}/>
       </Popup>
      )}    
    </Layout>
  );
}

export default App;
