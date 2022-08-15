import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect, useState} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import PaginationMain from "../../components/pagination-main";

function Main(){

  console.log('Main');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const firstItemIndex = (currentPage - 1) * itemsPerPage;
  // const [pageNumberLimit, setPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(2);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(4);

  const store = useStore();

  useEffect(() => {
    store.get('catalog').load(itemsPerPage, firstItemIndex);
  }, [currentPage])

  const select = useSelector(state => ({
    count: state.catalog.count,
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.lang
  }));

  const quantityPages = Math.ceil(select.count / itemsPerPage);

  if (currentPage === minPageNumberLimit + 2 && !(currentPage === quantityPages - 1)) {
    setMinPageNumberLimit(minPageNumberLimit + 1);
    setMaxPageNumberLimit(maxPageNumberLimit + 1)
  }

  if (currentPage === minPageNumberLimit && !(currentPage === 2)) {
    setMinPageNumberLimit(minPageNumberLimit - 1);
    setMaxPageNumberLimit(maxPageNumberLimit - 1)
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (pageNumber === 1) {
      setMinPageNumberLimit(2);
      setMaxPageNumberLimit(4)
    }
    if (pageNumber === quantityPages) {
      setMinPageNumberLimit(quantityPages - 3);
      setMaxPageNumberLimit(quantityPages - 1)
    }
  }

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Изменение языка интерфейса
    changeLanguage: useCallback(() => store.get('language').getLanguage(select.lang), [select.lang])
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} lang={select.lang}/>, [select.lang]),
  }

  return (
    <Layout title={select.lang ? 'Shop' : 'Магазин'} changeLanguage={callbacks.changeLanguage}>
      <BasketSimple 
        onOpen={callbacks.openModalBasket} 
        amount={select.amount} 
        sum={select.sum} 
        setCurrentPage={setCurrentPage}
        lang={select.lang}
      />
      <List items={select.items} renderItem={renders.item}/>
      <PaginationMain   
        paginate={paginate} 
        currentPage={currentPage}
        minPageNumberLimit={minPageNumberLimit}
        maxPageNumberLimit={maxPageNumberLimit}
        quantityPages={quantityPages}
      />
    </Layout>
  )
}

export default React.memo(Main);
