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
import CommentSection from "../../components/comment-section";

function Article() {
  const store = useStore();
  // Параметры из пути /articles/:id
  const params = useParams();

  const storeRedux = useStoreRedux();

  useInit(async () => {
    await Promise.all([
      storeRedux.dispatch(actionsArticle.load(params.id)),
      storeRedux.dispatch(actionsComments.load(params.id)),
    ]);
  }, [params.id]);

  const isLoggedIn = useSelector((state) => state.session.exists);

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
      waiting: state.comments.waiting,
    }),
    shallowEqual
  );

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get("basket").addToBasket(_id), []),
    createComment: ({ text, parent_id, parent_type }) => {
      storeRedux.dispatch(
        actionsComments.create({
          text,
          parent: { _id: parent_id, _type: parent_type },
        })
      );
    },
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
        {!commentsSlice.waiting && (
          <CommentSection
            list={commentsSlice.list}
            count={commentsSlice.count}
            isLoggedIn={isLoggedIn}
            createComment={callbacks.createComment}
            articleId={params.id}
          />
        )}
      </Spinner>
    </Layout>
  );
}

export default React.memo(Article);
