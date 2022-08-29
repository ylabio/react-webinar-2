import React, {useCallback} from 'react';
import {
  useStore as useStoreRedux,
  useSelector as useSelectorRedux,
  shallowEqual
} from 'react-redux';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import {useParams} from 'react-router-dom';
import useInit from '../../hooks/use-init';
import useTranslate from '../../hooks/use-translate';
import ArticleCard from '../../components/article-card';
import Spinner from '../../components/spinner';
import Layout from '../../components/layout';
import TopContainer from '../../containers/top';
import HeadContainer from '../../containers/head';
import ToolsContainer from '../../containers/tools';
import actionsArticle from '../../store-redux/article/actions';
import Comments from '../../containers/comments';
import NewComment from '../../components/new-comment-form';
import {
  isFormVisible,
  selectCommentsTotal
} from '../../store-redux/comments-slice';
import ProtectedCommentForm from '../../containers/protected-comment-form';

function Article() {
  const store = useStore();
  // Параметры из пути /articles/:id
  const params = useParams();

  const storeRedux = useStoreRedux();
  const commentsTotal = useSelectorRedux(selectCommentsTotal);

  useInit(async () => {
    //await store.get('article').load(params.id);
    storeRedux.dispatch(actionsArticle.load(params.id));
  }, [params.id]);

  const selectStore = useSelector(state => ({
    exists: state.session.exists,
    waiting: state.session.waiting
  }));

  const select = useSelectorRedux(
    state => ({
      article: state.article.data,
      waiting: state.article.waiting
    }),
    shallowEqual
  );

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), [])
  };

  return (
    <Layout>
      <TopContainer />
      <HeadContainer title={select.article.title || ''} />
      <ToolsContainer />
      <Spinner active={select.waiting}>
        <ArticleCard
          article={select.article}
          onAdd={callbacks.addToBasket}
          t={t}
        />
      </Spinner>
      <h2>Комментарии ({commentsTotal})</h2>
      <Comments articleId={params.id} />
    </Layout>
  );
}

export default React.memo(Article);
