import React, {useCallback} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const callbacks = {
    onAddItems: useCallback((item) => {
      store.addToModal(item);
    }, []),
    onDeleteItems: useCallback((item) => {
      store.deleteItem(item.code);
    }, []),
  }
  const [modalOpened, setModalOpened] = React.useState(false);
  return (
      <div>
        <Layout head={<h1>Приложение на чистом JS</h1>}>
          <Controls items={store.getState().itemsModal} onClickModal = { () => setModalOpened(true)}/>
          <List items={store.getState().items}
                actionButton={callbacks.onAddItems}
                textButton={'Добавить'}
          />
        </Layout>
        {modalOpened &&  <Modal onDeleteItems={callbacks.onDeleteItems}
                                items={store.getState().itemsModal}
                                onClose = { () => setModalOpened(false)} >
          <List items={store.getState().itemsModal}
                actionButton={callbacks.onDeleteItems}
                textButton={'Удалить'}
          />
        </Modal>}
      </div>

  );
}

export default App;
