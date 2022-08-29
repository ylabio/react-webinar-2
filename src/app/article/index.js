import React, {useCallback, useMemo} from "react";
import {useStore as useStoreRedux, useSelector as useSelectorRedux, shallowEqual} from "react-redux";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
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
import actionsArticleComments from '../../store-redux/article-comments/actions';
import Comments from '../../containers/comments';
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";

function Article(){
  const store = useStore();
  // Параметры из пути /articles/:id
  const params = useParams();

  const storeRedux = useStoreRedux();

  useInit(async () => {
    //await store.get('article').load(params.id);
    storeRedux.dispatch(actionsArticle.load(params.id));
    storeRedux.dispatch(actionsArticleComments.loadComments(params.id));
  }, [params.id]);

  const session = useSelector(state => state.session);

  const select = useSelectorRedux(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    comments: state.comments.comments
  }), shallowEqual);
  let comments = useMemo(() => treeToList(listToTree(select.comments)), [select.comments]);

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    submitComment: useCallback((commentText, parent) => storeRedux.dispatch(actionsArticleComments.sendNewComment(commentText, parent)), []),
  };

  return (
    <Layout>
      <TopContainer/>
      <HeadContainer title={select.article.article?.title || ''}/>
      <ToolsContainer/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article.article} onAdd={callbacks.addToBasket} t={t}/>
        <Comments
          comments={comments}
          session={session}
          submitComment={callbacks.submitComment}
          parent={select.article} />
      </Spinner>
    </Layout>
  )
}

export default React.memo(Article);
