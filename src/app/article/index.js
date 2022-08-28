import React, { useCallback } from 'react';
import { useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import actionsArticle from '../../store-redux/article/actions';
import actionsComment from '../../store-redux/comments/actions';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import ArticleCard from '../../components/article-card';
import Spinner from '../../components/spinner';
import Layout from '../../components/layout';
import TopContainer from '../../containers/top';
import HeadContainer from '../../containers/head';
import ToolsContainer from '../../containers/tools';
import CommentsList from '../../components/comments-list';

function Article() {
  const store = useStore();

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const storeRedux = useStoreRedux();
  const userName = useSelector((state) => state.session.user.profile?.name);

  useInit(async () => {
    storeRedux.dispatch(actionsArticle.load(params.id));
    storeRedux.dispatch(actionsComment.load(params.id));
  }, [params.id]);

  const select = useSelectorRedux(
    (state) => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.comments.data,
    }),
    shallowEqual
  );

  const { t } = useTranslate();

  const options = {
    comments: React.useMemo(() => {
      return (
        select.comments.length &&
        treeToList(listToTree(select.comments, undefined, select.article._id), (item, level) => ({
          id: item._id,
          text: item.text,
          author: item.author.profile?.name,
          marginLeft: 30 * level,
          date: item.dateCreate,
          active: item.active,
        }))
      );
    }, [select.comments]),
  };

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),

    onSubmit: React.useCallback((data) => {
      storeRedux.dispatch(actionsComment.createComment(data));
      /*  storeRedux.dispatch(actionsComment.load(params.id)); */
    }, []),
    onRedirect: React.useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, []),
  };

  return (
    <Layout>
      <TopContainer />
      <HeadContainer title={select.article.title || ''} />
      <ToolsContainer />
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
      </Spinner>
      <CommentsList
        onSubmit={callbacks.onSubmit}
        onRedirect={callbacks.onRedirect}
        userName={userName}
        id={select.article._id}
        comments={options.comments}
      />
    </Layout>
  );
}

export default React.memo(Article);
