import React from "react";
import {
  useStore as useStoreRedux,
  useSelector as useSelectorRedux,
  shallowEqual,
} from "react-redux";
import { useParams } from "react-router-dom";
import useInit from "../../hooks/use-init";
import Layout from "../../components/layout";
import TopContainer from "../../containers/top";
import HeadContainer from "../../containers/head";
import ToolsContainer from "../../containers/tools";
import actionsArticle from "../../store-redux/article/actions";
import * as actionsComments from "../../store-redux/comments/actions";
import ArticleContainer from "../../containers/article";
import CommentsContainer from "../../containers/comments";

function Article() {
  // Параметры из пути /articles/:id
  const params = useParams();

  const storeRedux = useStoreRedux();

  useInit(async () => {
    //await store.get('article').load(params.id);
    storeRedux.dispatch(actionsArticle.load(params.id));
    storeRedux.dispatch(actionsComments.load(params.id));
  }, [params.id]);

  const select = useSelectorRedux(
    (state) => ({
      article: state.article.data,
    }),
    shallowEqual
  );

  return (
    <Layout>
      <TopContainer />
      <HeadContainer title={select.article.title || ""} />
      <ToolsContainer />
      <ArticleContainer />
      <CommentsContainer />
    </Layout>
  );
}

export default React.memo(Article);
