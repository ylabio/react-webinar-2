import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect, useState} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import { useParams } from "react-router-dom";
import { localize } from "../../utils/localize";

function Main(){

  console.log('Main');

  const store = useStore();

  const { pageIndex = 1 } = useParams();
	const pageIndexNo = Number(pageIndex);

	const [limit] = useState(10);
	const [skip, setSkip] = useState(0);

	useEffect(() => {
		setSkip(limit * (pageIndexNo - 1));
		store.get('catalog').load(limit, skip);
	}, [skip, pageIndexNo]);

  const select = useSelector(state => ({
    items: state.catalog.items,
    count: state.catalog.count,
		language: state.localization.language,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} language={select.language} />, [select.language]),
  }

  const pageCount = Math.ceil(select.count / limit);

  return (
    <Layout head={<h1>{localize['Магазин'][select.language]}</h1>}>
			{pageCount >= pageIndex && (
				<>
					<List items={select.items} renderItem={renders.item} />
					<Pagination
						pageCount={pageCount}
						limit={limit}
						setSkip={setSkip}
						pageIndexNo={pageIndexNo}
					/>
				</>
			)}
		</Layout>
  )
}

export default React.memo(Main);
