import React, {useCallback, useMemo} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import List from "../../components/elements/list";
import Pagination from "../../components/pagination";
import Spinner from "../../components/elements/spinner";
import Item from "../../components/items/item";
import makeSearchStr from "../../utils/makeSearchStr";

function CatalogList() {

  const {t} = useTranslate();
  const store = useStore();
  const select = useSelector(state => ({
    items: state.catalog.items,
    page: state.catalog.params.page,
    limit: state.catalog.params.limit,
    count: state.catalog.count,
    waiting: state.catalog.waiting,
    params: state.catalog.params,
  }));

  const url = useMemo(() => {
    return {
      base: 'http://localhost:8010/',
      query: makeSearchStr(select.params, { exclude: ['page', 'limit'] }),
    }
  }, [select.params]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Пагианция
    onPaginate: useCallback(page => store.get('catalog').setParams({page}), []),
  };

  const renders = {
    item: useCallback(item => (
      <Item item={item} onAdd={callbacks.addToBasket} link={`/articles/${item._id}`} labelAdd={t('article.add')}/>
    ), [t]),
  }

  return (
    <Spinner active={select.waiting}>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination count={select.count} page={select.page} limit={select.limit} onChange={callbacks.onPaginate} url={url}/>
    </Spinner>
  );
}

export default React.memo(CatalogList);
