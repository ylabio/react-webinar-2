import React, { useCallback } from "react";
import {
  useStore as useStoreRedux,
  useSelector as useSelectorRedux,
  shallowEqual,
} from "react-redux";
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
import actionsArticle from "../../store-redux/article/actions";
import actionsComments from "../../store-redux/comments/actions";

function Article() {
  const store = useStore();
  // Параметры из пути /articles/:id
  const params = useParams();

  const storeRedux = useStoreRedux();

  useInit(async () => {
    storeRedux.dispatch(actionsArticle.load(params.id));
    storeRedux.dispatch(actionsComments.load(params.id));
  }, [params.id]);

  const select = useSelectorRedux(
    (state) => ({
      article: state.article.data,
      waiting: state.article.waiting,
    }),
    shallowEqual
  );

  const commentsSlice = useSelectorRedux(
    (state) => ({
      list: state.comments.data,
      count: state.comments.count,
    }),
    shallowEqual
  );

  console.log(commentsSlice.list);

  const testCreateComment = () => {
    storeRedux.dispatch(
      actionsComments.create({
        text: "This is a test answer creation",
        parent: { _id: "630a467d702e221d999b3b70", _type: "comment" },
      })
    );
  };

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get("basket").addToBasket(_id), []),
  };

  return (
    <Layout>
      <TopContainer />
      <HeadContainer title={select.article.title || ""} />
      <ToolsContainer />
      <Spinner active={select.waiting}>
        <ArticleCard
          article={select.article}
          onAdd={callbacks.addToBasket}
          t={t}
        />
        <button onClick={testCreateComment}>Create comment</button>
      </Spinner>
    </Layout>
  );
}

export default React.memo(Article);
