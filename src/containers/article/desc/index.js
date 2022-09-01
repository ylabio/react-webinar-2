import React, {useCallback} from 'react';
import {useSelector as useSelectorRedux, useStore as useStoreRedux} from 'react-redux';
import {useParams} from 'react-router-dom';
import ArticleCard from '../../../components/article-card';
import Spinner from '../../../components/spinner';
import useInit from '../../../hooks/use-init';
import useStore from '../../../hooks/use-store';
import useTranslate from '../../../hooks/use-translate';
import actionsArticle from '../../../services/store-redux/article/actions';

function ArticleDescription() {
  const storeRedux = useStoreRedux();
  const store = useStore();
  const params = useParams();
  const {t} = useTranslate();

  const select = useSelectorRedux(state => ({
    data: state.article.data,
    waiting: state.article.waiting
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), [])
  };

  useInit(async () => {
    storeRedux.dispatch(actionsArticle.load(params.id));
  }, [params.id]);

  return (
    <Spinner active={select.waiting}>
      <ArticleCard article={select.data} onAdd={callbacks.addToBasket} t={t} />
    </Spinner>
  );
}

export default React.memo(ArticleDescription);
