import List from '../../components/list';
import React, { useCallback, useEffect, useRef } from 'react';
import Item from '../../components/item';
import useStore from '../../utils/hooks/use-store';
import useSelector from '../../utils/hooks/use-selector';
import useLang from '../../utils/hooks/use-lang';
import Pagination from '../../components/pagination';
import CommonLayout from '../../containers/common-layout';
import { useSearchParams } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import 'style.css';

//TODO Для страницы товара нужно создать новый модуль внешнего состояния. В нём объект товара и методы для его загрузки из апи. Метод загрузки вызывается со страницы товара с передачей идентификатора товара. Недопустимо делать запросы к апи напрямую из компонента. Все сведения о товаре можно получить одним запросом. Примеры запросов в файле articles.http.

function Main() {
  const { item: itemLn } = useLang();
  const cn = bem('Catalog');
  const store = useStore();
  const [searchParams] = useSearchParams();
  const initPage = useRef(false);
  const select = useSelector((state) => ({
    items: state.catalog.items,
    pages: state.catalog.pages,
    currPage: state.catalog.currPage,
    loading: state.catalog.loading,
  }));

  const callbacks = {
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
  };

  const renders = {
    item: useCallback(
      (item) => <Item item={item} onAdd={callbacks.addToBasket} ln={itemLn} />,
      [itemLn]
    ),
  };

  useEffect(() => {
    if (initPage.current) store.get('catalog').load();
  }, [select.currPage, initPage.current]);

  useEffect(() => {
    if (initPage.current) {
      store.get('catalog').setParamsPage(searchParams.get('page'));
    } else {
      store.get('catalog').setParamsPage(searchParams.get('page'));
      initPage.current = true;
    }
  }, [searchParams]);

  return (
    <CommonLayout>
      {select.loading ? (
        <div style={{ paddingLeft: '20px' }}>loading...</div>
      ) : (
        <div className={cn()}>
          {!!select.items.length && (
            <>
              <List items={select.items} renderItem={renders.item} />
              <Pagination
                pages={select.pages}
                activePage={select.currPage}
              />
            </>
          )}
        </div>
      )}
    </CommonLayout>
  );
}

export default React.memo(Main);
