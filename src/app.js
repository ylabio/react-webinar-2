import React, {useCallback, useState, useMemo} from 'react';
import Controls from "./components/controls";
import List from "./components/list";
import Layout from "./components/layout";
import Modal from './components/modal';
import ModalHeader from './components/modal-header';
import ModalList from './components/modal-list';
import plural from 'plural-ru';

function orderToString(sum, length){
  if (length === 0) return 'пусто'
  return `${length} ${plural(length, 'товар', 'товара', 'товаров')} / ${Intl.NumberFormat('ru-RU').format(sum)} ₽`;
}

function orderSum(order){
  const sum = order.reduce((sum, current) => sum + current.price * current.amount, 0)
  return orderToString(sum, order.length)
}
/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App({store}) {

  const [order, setOrder] = useState([]);
  const [isModalActive, setModalActive] = useState(false);
  const [orderForModal, setOrderForModal] = useState(order);
  
  const addItem = (item, amount) => {
    if(order.length === 0){
      setOrder(prev => [...prev, {...item, amount}]);
    } else {
      setOrder(prev => prev.map(elem => item.code === elem.code? {...elem, amount} : {...elem}))
    }
  }

  useMemo(() => setOrderForModal(order), [order])

  const onDeleteHanlerForModal = useCallback(code => {
    setOrderForModal(order => order.filter(item => {
      return (item.code === code)? false : true;         
    }))
  }, [orderForModal])


let sum = useCallback(orderForModal.reduce((sum, item) => sum + item.price * item.amount, 0));

  return (   
    <>
    {isModalActive
        ? <Modal>  
          <ModalHeader setModalActive={setModalActive}/>
          <ModalList orderForModal={orderForModal} onDelete={onDeleteHanlerForModal} totalSum={sum}/> 
        </Modal>
        : null}
      <Layout head={<h1>Приложение на чистом JS</h1>}>
        <Controls orderResult={orderSum(order)} setModalActive={setModalActive}/>
        <List items={store.getState().items} onAddItem={addItem}/>
      </Layout>
    </>    
  );
}

export default App;
