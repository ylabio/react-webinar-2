import List from "../../components/list";
import React, {useCallback, useEffect, useState} from "react";
import Item from "../../components/item";
import Paginator from "../../components/paginator";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function ProductList(){

  const store = useStore();
  const [pageNumber, setPageNumber] = useState(1);
  const itemsOnPage = 10;

  useEffect(() => {
    store.get('catalog').load(itemsOnPage,((pageNumber - 1) * itemsOnPage));
  }, [pageNumber])

  const select = useSelector(state => ({
    items: state.catalog.items,
    totalCount: state.catalog.totalCount,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  return (
		<>
		<div>LIST</div>
			{/* <List items={select.items} renderItem={renders.item}/>
			<Paginator 
			itemsAmount={select.totalCount}
			currentPage={pageNumber}
			callback={setPageNumber}
			range={3}
			itemsOnPage={itemsOnPage}/> */}
			);
		</>
	)
}

export default React.memo(ProductList);