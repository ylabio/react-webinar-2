import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect, useState} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";

function Main(){

  console.log('Main');

  const store = useStore();

  const [limit] = useState(10);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    store.get('catalog').load(limit, skip);
  }, [skip])

  const select = useSelector(state => ({
    items: state.catalog.items,
    count: state.catalog.count,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination
				count={select.count}
				limit={limit}
        skip={skip}
        setSkip={setSkip}
			/>
    </Layout>
  )
}

export default React.memo(Main);
