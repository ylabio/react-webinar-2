import React, { useCallback } from "react";
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import LayoutHead from "./components/layout/layout-head";
import Total from "./components/total";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const cn = bem("Store");
  const sm = bem("Summary");
  const callbacks = {
    showModal: useCallback(() => {
      store.toggleShowBasket();
    }, []),
    closeModal: useCallback((e) => {
      if (e.target.className === "Modal" || e.target.className === "button") {
        e.stopPropagation();
        store.toggleShowBasket();
      }
    }, []),
    onAddQuantity: useCallback((item) => {
      store.addToBasket(item);
    }, []),
    onDeleteItem: useCallback((item) => {
      console.log(item);
      store.deleteItemFromBasket(item.code);
    }, []),
  };
  return (
    <div className={cn()}>
      <Layout head={<LayoutHead head={<h1>Магазин</h1>} />}>
        <div className={sm()}>
          <span className={sm("text")}>В корзине: </span>
          <Total list={store.state.itemsBasket} isShowAmount={true} />
          <Controls handlerClick={callbacks.showModal} textButton={"Перейти"} />
        </div>
        <List
          items={store.getState().items}
          handlerClick={callbacks.onAddQuantity}
          textButton={"Добавить"}
        />
        {store.state.isShowBasket ? (
          <Modal closeModal={callbacks.closeModal}>
            <List
              items={store.getState().itemsBasket}
              handlerClick={callbacks.onDeleteItem}
              textButton={"Удалить"}
            />
            {store.state.itemsBasket.length ? (
              <Total list={store.state.itemsBasket} isShowAmount={false} />
            ) : (
              ""
            )}
          </Modal>
        ) : (
          ""
        )}
      </Layout>
    </div>
  );
}

export default App;
