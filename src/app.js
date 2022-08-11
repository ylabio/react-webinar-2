import React, { useCallback, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import Controls from './components/controls';
import List from './components/list';
import Item from './components/item/index';
import TotalPrice from './components/total-price';
import ItemInBin from './components/item-in-bin';
import Layout from './components/layout';
import Popup from './components/popup';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({ store }) {
  const items = store.getState().items;

  const [isBinPopupOpen, setIsBinPopupOpen] = useState(false);

  const callbacks = {
    onOpenBinModal: useCallback(() => {
      setIsBinPopupOpen(!isBinPopupOpen);
    }, []),
    onCloseModal: useCallback(() => {
      setIsBinPopupOpen(false);
    }, []),
    onAddItemToBin: useCallback((code) => {
      store.addItemToBin(code);
    }, []),
    onDeleteItemFromBin: useCallback((code) => {
      store.DeleteItemFromBin(code);
    }, []),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Controls
        items={items}
        onOpenModal={callbacks.onOpenBinModal}
        counter={store.counter}
        totalPrice={store.totalPrice}
      />
      <List>
        {items.map((item) => {
          const cn = bem('List');
          return (
            <div key={item.code} className={cn('item')}>
              <Item item={item} onAddItemToBin={callbacks.onAddItemToBin} />
            </div>
          );
        })}
      </List>
      {isBinPopupOpen ? (
        <Popup
          name={'Корзина'}
          items={items}
          totalPrice={store.totalPrice}
          onCloseModal={callbacks.onCloseModal}
          onDeleteItemFromBin={callbacks.onDeleteItemFromBin}
        >
          <List>
            {items.map((item) => {
              const cn = bem('Popup');
              if (item.addCounter > 0) {
                return (
                  <div key={item.code} className={cn('item')}>
                    <ItemInBin
                      item={item}
                      onDeleteItemFromBin={callbacks.onDeleteItemFromBin}
                      key={item.code}
                    />
                  </div>
                );
              }
            })}
          </List>
          <TotalPrice totalPrice={store.totalPrice} />
        </Popup>
      ) : null}
    </Layout>
  );
}

export default App;
