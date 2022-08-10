import React, {useCallback, useState} from 'react';
import Head from './components/head';
import List from "./components/list";
import ListModal from "./components/list-modal";
import Layout from "./components/layout";
import ModalPreview from './components/modal-preview';
import Modal from './components/modal';
import Total from './components/total';
import style from './components/modal/style.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {
  const [isVisibleModal, setVisibleModal] = useState(false);

  const callbacks = {
    onAddItems: useCallback(item => {
      store.addInBasket(item);
    }, []),
    onTransition: useCallback(() => setVisibleModal(prev => !prev), []),
    onDeleteItems: useCallback((code, count) => {
      store.deleteFromBasket(code, count);
    }, []),
  }

  const state = store.getState();
  const {basket, count, sum} = state;

  return (
    <div className={isVisibleModal ? 'App' : ''}>
      <Layout head={<Head title='Магазин' />}>
        <ModalPreview sum={sum} count={count} onTransition={callbacks.onTransition}/>
        <List items={store.getState().items} onAddItems={callbacks.onAddItems} />
      </Layout>
      {isVisibleModal && <Modal closeModal={callbacks.onTransition} >
        <div>
          <ListModal items={basket}
            onDeleteItems={callbacks.onDeleteItems}
          />
            {!!basket.length && <Total sum={sum}/>}
        </div>
           </Modal>}
    </div>
	);
}

export default App;
