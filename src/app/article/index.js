import Layout from "../../components/layout";
import React, {useCallback} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useParams} from "react-router-dom";
import ArticleCard from "../../components/article-card";
import Spinner from "../../components/spinner";
import useInit from "../../utils/use-init";
import Tools from "../../containers/tools";

function Article(){

  const store = useStore();

  // Параметры из пути /articles/:id
  const params = useParams();

  useInit(async () => {
    await store.get('article').load(params.id);
  }, [params.id]);

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  return (
    <Layout head={<h1>{select.article.title}</h1>}>
      <Tools/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket}/>
      </Spinner>
    </Layout>
  )
}

export default React.memo(Article);
