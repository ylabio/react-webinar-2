import React, {useCallback, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Layout from "../../components/layout";
import ItemInfo from '../../components/item-info';
import BasketSimple from "../../components/basket-simple";
import Menu from "../../components/menu";
import Controls from "../../components/controls";

function InfoPage() {

  const store = useStore();
  const {id} = useParams();

  useEffect(() => {
    store.get('itemInfo').loadInfo(id);
    store.get('catalog').loadFromId(id);
  }, [id])

  const select = useSelector(state => ({
    itemInfo: state.itemInfo,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  return (
    <div>
      <Layout head={<h1>{select.itemInfo.item.title}</h1>}>
        <Controls>
          <Menu main={'Главная'}/>
          <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
        </Controls>
        <ItemInfo itemInfo={select.itemInfo} onAdd={callbacks.addToBasket}/>
      </Layout>
    </div>
  )
}

export default React.memo(InfoPage)
