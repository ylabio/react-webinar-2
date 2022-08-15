import BasketSimple from '../../components/basket-simple';
import List from '../../components/list';
import Layout from '../../components/layout';
import React, { useCallback, useEffect } from 'react';
import Item from '../../components/item';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import Pagination from '../../components/pagination';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Article from '../../components/Article';
import item from '../../components/item';

function Main() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const navigate = useNavigate();
  console.log('Main');

  const store = useStore();

  useEffect(() => {
    store.get('catalog').load(currentPage);
  }, [currentPage]);

  const select = useSelector((state) => ({
    items: state.catalog.items,
    selectItem: state.catalog.selectItem,
    amount: state.basket.amount,
    sum: state.basket.sum,
    country: state.catalog.country,
    category: state.catalog.category,
  }));
  console.log('1', select.items);
  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
    openItem: useCallback((_id) => {
      navigate(`/${_id}`);
      store.get('catalog').loadItem(_id);
    }),
  };

  const renders = {
    item: useCallback(
      (item) => <Item item={item} onAdd={callbacks.addToBasket} openItem={callbacks.openItem} />,
      [],
    ),
  };

  return (
    <Routes>
      <Route path='/' element={<Layout head={<h1>Магазин</h1>} />}>
        <Route
          index
          element={
            <>
              <BasketSimple
                onOpen={callbacks.openModalBasket}
                amount={select.amount}
                sum={select.sum}
              />
              <List items={select.items} renderItem={renders.item} />
              <Pagination
                style={{ float: 'right', marginRight: '15px' }}
                totalPages={25}
                currentPage={currentPage}
                onChange={(page) => setCurrentPage(page)}
                hidePreviousAndNextPageLinks={true}
                hideFirstAndLastPageLinks={true}
              />
            </>
          }
        />
      </Route>
      <Route
        path='/:id'
        element={<Layout head={<h1>{select.selectItem ? select.selectItem.title : ''}</h1>} />}>
        <Route
          index
          element={
            <>
              <BasketSimple
                onOpen={callbacks.openModalBasket}
                amount={select.amount}
                sum={select.sum}>
                <span
                  style={{ textDecoration: 'underline', color: '#0087E9', cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/');
                    store.get('catalog').load(currentPage);
                  }}>
                  Главная
                </span>
              </BasketSimple>
              <Article
                description={select.selectItem && select.selectItem.description}
                price={select.selectItem && select.selectItem.price}
                edition={select.selectItem && select.selectItem.edition}
                onAdd={callbacks.addToBasket}
                category={select.category && select.category.title}
                country={select.country && select.country.title}
              />
            </>
          }
        />
      </Route>
    </Routes>
  );
}

export default React.memo(Main);
