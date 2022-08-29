import React, { useCallback, useMemo, useEffect } from "react";
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
import actionsComments from '../../store-redux/comments/action'
import Comments from "../../components/comments";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
function Article() {
  const store = useStore();
  // Параметры из пути /articles/:id
  const params = useParams();

  const storeRedux = useStoreRedux();



  const select = useSelectorRedux(state => ({
    article: state.article.data,
    waiting: state.article.waiting,

    сount: state.сomments.data,
    сomments: state.сomments.data.items || [],

  }), shallowEqual);

  useInit(async () => {
    //await store.get('article').load(params.id);
    storeRedux.dispatch(actionsArticle.load(params.id));
    storeRedux.dispatch(actionsComments.loadComments(params.id))

  }, [params.id]);

  const callbacksRedux = {

    submitComment: useCallback(async (data) => {
       storeRedux.dispatch(actionsComments.submitComment(data));
       storeRedux.dispatch(actionsComments.loadComments(params.id))
    }, []),
  }

  const options = {
    сomments: useMemo(() => {
      return (
        treeToList(
          listToTree(select.сomments, undefined, select.article._id),
          (item, level) => ({
            id: item._id,
            text: item.text,
            author: item.author.profile?.name,
            marginLeft: 30 * level,
            date: item.dateCreate,

          }

          )
        )
      )
    }


      , [select.сomments]),
  }

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  return (
    <Layout>
      <TopContainer />
      <HeadContainer title={select.article.title || ''} />
      <ToolsContainer />
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />

      </Spinner>
      <Spinner active={select.сomments.length === 0}>
        <Comments
          id={select.article._id}
          comments={options.сomments}
          count={select.сomments.length}
          activeComments={callbacksRedux.activeComments}
          submitComment={callbacksRedux.submitComment}
        />
      </Spinner>
    </Layout>
  )
}

export default React.memo(Article);
