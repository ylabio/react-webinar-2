import React, {useCallback} from "react";
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import useStore from "../../hooks/use-store";
import {useParams} from "react-router-dom";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import ArticleCard from "../../components/article-card";
import Spinner from "../../components/spinner";
import Layout from "../../components/layout";
import TopContainer from "../../containers/top";
import HeadContainer from "../../containers/head";
import ToolsContainer from "../../containers/tools";
import actionsArticle from '../../store-redux/article/actions';
import CommentsContainer from "../../containers/comments-container";

function Article(){
  const store = useStore();
  // Параметры из пути /articles/:id
  const params = useParams();

  const storeRedux = useStoreRedux();

  const select = useSelectorRedux(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    comments: state.comments.data,
    numberOfComments: state.comments.numberOfComments,
  }), shallowEqual);

  useInit(async () => {
    storeRedux.dispatch(actionsArticle.load(params.id));
  }, [params.id]);

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  return (
    <Layout>
      <TopContainer/>
      <HeadContainer title={select.article.title || ''}/>
      <ToolsContainer/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
      <CommentsContainer/>
      </Spinner>
    </Layout>
  )
}

export default React.memo(Article);
