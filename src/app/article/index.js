import React, { useCallback, useMemo } from 'react';
import { useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual } from 'react-redux';
import Comments from '../../components/comments';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { useLocation, useParams } from 'react-router-dom';
import useInit from '../../hooks/use-init';
import useTranslate from '../../hooks/use-translate';
import ArticleCard from '../../components/article-card';
import Spinner from '../../components/spinner';
import Layout from '../../components/layout';
import TopContainer from '../../containers/top';
import HeadContainer from '../../containers/head';
import ToolsContainer from '../../containers/tools';
import actionsArticle from '../../store-redux/article/actions';
import actionsComments from '../../store-redux/comments/actions';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';

function Article() {
  const store = useStore();
  // Параметры из пути /articles/:id
  const params = useParams();
  const location = useLocation();

  const storeRedux = useStoreRedux();

  useInit(async () => {
    //await store.get('article').load(params.id);
    storeRedux.dispatch(actionsArticle.load(params.id));
    storeRedux.dispatch(actionsComments.load(params.id));
  }, [params.id]);

  const select = useSelector(state => ({
    exists: state.session.exists,
    locale: state.locale.lang
  }));

  const selectRedux = useSelectorRedux(state => ({
    article: state.article.data,
    articleWaiting: state.article.waiting,
    comments: state.comments.data,
    commentsCount: state.comments.count,
    commentsWaiting: state.comments.waiting
  }), shallowEqual);

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Отправка комментария
    sendComment: useCallback((commentId, text) => {
      const parent = commentId
        ? { _id: commentId, _type: 'comment' }
        : { _id: selectRedux.article._id, _type: 'article' };
      storeRedux.dispatch(actionsComments.upload(text, parent));
    }, [selectRedux.article])
  };

  const comments = useMemo(() => [
    ...treeToList(
      listToTree(selectRedux.comments),
      (item, level) => ({ item, level })
    )
  ], [selectRedux.comments]);

  return (
    <Layout>
      <TopContainer />
      <HeadContainer title={selectRedux.article.title || ''} />
      <ToolsContainer />
      <Spinner active={selectRedux.articleWaiting}>
        <ArticleCard article={selectRedux.article} onAdd={callbacks.addToBasket} t={t} />
      </Spinner>
      <Spinner active={selectRedux.commentsWaiting}>
        <Comments
          session={select.exists}
          comments={comments}
          commentsCount={selectRedux.commentsCount}
          pathname={location.pathname}
          locale={select.locale}
          sendComment={callbacks.sendComment}
          t={t}
        />
      </Spinner>
    </Layout>
  );
}

export default React.memo(Article);
