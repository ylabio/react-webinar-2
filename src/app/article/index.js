import React, { useCallback, Fragment } from "react";
import { useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual } from "react-redux";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useParams } from "react-router-dom";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import ArticleCard from "../../components/article-card";
import Spinner from "../../components/spinner";
import Layout from "../../components/layout";
import TopContainer from "../../containers/top";
import HeadContainer from "../../containers/head";
import ToolsContainer from "../../containers/tools";
import actionsArticle from '../../store-redux/article/actions';
import actionsComments from '../../store-redux/comments/actions';
import CommentsList from "../../components/comments-list";
import CommentItem from "../../components/comment-item";
import { useLocation } from "react-router-dom";


function Article() {
  const store = useStore();
  // Параметры из пути /articles/:id
  const params = useParams();

  const location = useLocation();


  const storeRedux = useStoreRedux();






  const select = useSelectorRedux(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    complite: state.article.complite,
    waitingCom: state.comments.waiting,
    comments: state.comments.comData,
    lastCommented: state.comments.lastCommented
  }), shallowEqual);



  const selectDefault = useSelector(state => ({
    token: state.session.token
  }));

  useInit(() => {
    //await store.get('article').load(params.id);
    storeRedux.dispatch(actionsArticle.load(params.id));
    location.state = "";
  }, [params.id]);

  useInit(() => {
    storeRedux.dispatch(actionsComments.loadComments(params.id, select.article))
  }, [select.article, select.lastCommented]);

  console.log(params);





  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),

    sendMessage: useCallback((_id, text, parent) => storeRedux.dispatch(actionsComments.sendComment(_id, text, parent)), [])
  };

  const renders = {
    comment: useCallback((callbacks, comment, locationAndToken) => (
      <CommentItem callbacks={callbacks} comment={comment} locationAndToken={locationAndToken} />
    ), [select.comments])
  }

  return (
    <Layout>
      <TopContainer />
      <HeadContainer title={select.article.title || ''} />
      <ToolsContainer />
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
        <CommentsList callbacks={callbacks.sendMessage} comments={select.comments} render={renders.comment}
          other={{ location: location, token: selectDefault.token, parentId: select.article }} />
      </Spinner>
    </Layout>
  )
}

export default React.memo(Article);
