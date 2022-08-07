import React from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import CartModal from "./components/cartModal";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [isModalActive, setIsModalActive] = React.useState(true);
  
  const handleAddItemToCart = (item) => {
    store.addItemToCart({title: item.title, price: item.price});
  };
  
  const handleDeleteCartItem = (code) => {
    store.deleteCartItem(code)
  };
  
  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls setIsModalActive={setIsModalActive} cartItems={store.getState().cartItems}/>
      <List
        items={store.getState().items}
        handleAddItemToCart={handleAddItemToCart}
      />
      <CartModal
        cartItems={store.getState().cartItems}
        isModalActive={isModalActive}
        setIsModalActive={setIsModalActive}
        handleDeleteCartItem={handleDeleteCartItem}
      />
    </Layout>
  );
}

export default App;
