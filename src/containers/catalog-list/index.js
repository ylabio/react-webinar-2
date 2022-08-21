import React, {useCallback} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import List from "../../components/list";
import Pagination from "../../components/pagination";
import Spinner from "../../components/spinner";
import Item from "../../components/item";
import ErrorMessage from '../../components/error-message';

function CatalogList() {
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector(state => ({
    items: state.catalog.pageItems,
    pending: state.catalog.fetchState.pending,
    error: state.catalog.fetchState.error,
    currentPage: state.catalog.currentPage,
    pagesCount: state.catalog.pagesCount,
    currentRoute: state.catalog.currentRoute,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  const renders = {
    item: useCallback(item => (
      <Item item={item} onAdd={callbacks.addToBasket} link={`/articles/${item._id}`} labelAdd={t('article.add')}/>
    ), [t]),
  }

  return !select.error
    ? (
      <Spinner active={select.pending}>
        <List items={select.items} renderItem={renders.item} />
        <Pagination current={select.currentPage} last={select.pagesCount} route={select.currentRoute}/>
      </Spinner>
    ) : (
      <ErrorMessage />
    )
}

export default React.memo(CatalogList);
