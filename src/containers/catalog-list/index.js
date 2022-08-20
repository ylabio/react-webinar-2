import React, {useCallback} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import List from "../../components/list";
import Pagination from "../../components/ui/pagination";
import Spinner from "../../components/ui/spinner";
import Item from "../../components/item";
import { QS_OPTIONS } from "../../store/catalog";
import qs from "qs";

function CatalogList() {
  const store = useStore();
  const params = useSelector(state => state.catalog.params);

  const select = useSelector(state => ({
    items: state.catalog.items,
    page: state.catalog.params.page,
    limit: state.catalog.params.limit,
    count: state.catalog.count,
    waiting: state.catalog.waiting,
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Пагианция
    onPaginate: useCallback(page => store.get('catalog').setParams({page}), []),
    generateLink: useCallback((page) => {
      if (page !== null) {
        const query = '/?' + qs.stringify({
          ...params,
          page
        }, QS_OPTIONS);
        return query;
      }
    }, [params]),
  };

  const renders = {
    item: useCallback(item => (
      <Item item={item} onAdd={callbacks.addToBasket} link={`/articles/${item._id}`} labelAdd={t('article.add')}/>
    ), [t]),
  }

  return (
    <Spinner active={select.waiting}>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination 
        count={select.count} 
        page={select.page} 
        limit={select.limit} 
        onChange={callbacks.onPaginate}
        generateLink={callbacks.generateLink}
      />
    </Spinner>
  );
}

export default React.memo(CatalogList);
