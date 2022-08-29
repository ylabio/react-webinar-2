import Comments from "components/comments";
import Comment from "components/comments/coment";
import ProtectedComments from "containers/protected-comments";
import React, {useCallback} from "react";
import {
  useStore as useStoreRedux,
  useSelector as useSelectorRedux,
  shallowEqual
} from "react-redux";
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
import actionsComments from '../../store-redux/comments/actions';

function Article() {
  const store = useStore();

  const params = useParams();

  const storeRedux = useStoreRedux();

  useInit(async () => {
    storeRedux.dispatch(actionsArticle.load(params.id));
  }, [params.id]);

  const select = useSelectorRedux(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
    comments: state.comments.data,
    textEditor: state.comments.textEditor,
    rerender: state.comments.rerender,
    waitingComments: state.comments.waiting,
  }), shallowEqual);

  useInit(async () => {
    storeRedux.dispatch(actionsComments.loadComments(params.id));
    storeRedux.dispatch(actionsComments.setEditor(params.id));
  }, [params.id, select.rerender]);

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    setEditor: useCallback(id => storeRedux.dispatch(actionsComments.setEditor(id)), []),
  };

  const renders = {
    comment: useCallback(item => (
      <Comment textEditor={select.textEditor} setEditor={callbacks.setEditor}
               comment={item} key={item.id}>
        <ProtectedComments id={item.id} redirect={'/login'}/>
      </Comment>
    ), [select.textEditor]),
  };

  return (
    <Layout>
      <TopContainer/>
      <HeadContainer title={select.article.title || ''}/>
      <ToolsContainer/>

      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
      </Spinner>

      <Spinner active={select.waitingComments}>
        <Comments comments={select.comments} renderComment={renders.comment}>
          <ProtectedComments id={params.id} redirect={'/login'}/>
        </Comments>
      </Spinner>
    </Layout>
  )
}

export default React.memo(Article);
