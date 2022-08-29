import React, { useCallback, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector as useSelectorRedux, useStore as useStoreRedux } from "react-redux";
import { useParams } from "react-router-dom";
import ArticleCard from "../../components/article-card";
import Layout from "../../components/layout";
import Spinner from "../../components/spinner";
import Comments from "../../containers/comments";
import HeadContainer from "../../containers/head";
import ToolsContainer from "../../containers/tools";
import TopContainer from "../../containers/top";
import useInit from "../../hooks/use-init";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import actionsComments from '../../store-redux/article-comments/actions';
import actionsArticle from '../../store-redux/article/actions';

function Article() {
  const store = useStore();
  // Параметры из пути /articles/:id
  const params = useParams();

  const storeRedux = useStoreRedux();

  useInit(async () => {
    //await store.get('article').load(params.id);
    storeRedux.dispatch(actionsArticle.load(params.id));
  }, [params.id]);

  const dispatch = useDispatch();
  useEffect(() => {
    storeRedux.dispatch(actionsComments.load(params.id));
  }, [params.id, dispatch]);

  const select = useSelectorRedux(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    comments: state.comments.data,
    waitingComments: state.comments.waiting
  }), shallowEqual);

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // куда отправить данные по комменту
    sendComment: useCallback(comment => storeRedux.dispatch(actionsComments.send(comment)), [])
  };

  return (
    <Layout>
      <TopContainer />
      <HeadContainer title={select.article.title || ''} />
      <ToolsContainer />
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
      </Spinner>
      <Comments id={params.id} comments={select.comments} onSend={callbacks.sendComment} waiting={select.waitingComments}/>
    </Layout>
  )
}

export default React.memo(Article);
