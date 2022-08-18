import React, {useCallback, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Layout from "../../components/layout";
import ArticleLayout from "../../components/layout-article";
import BasketSimple from "../../components/basket-simple";

function Article(){

  console.log('Article');

  const store = useStore();
  const {articleId} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    store.get('article').loadArticle(articleId);
  }, [articleId]);

  const select = useSelector(state => ({
    article: state.article.article,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    onNavigate: useCallback(() => navigate('/')),
    addToBasket: useCallback(_id => store.get('basket').addToBasket(articleId), []),
    openModalBasket: useCallback(() => store.get('modals').open('basket'), [])
  };

  return (
    <Layout head={<h1>{select.article?.title}</h1>}>
      <ArticleLayout
        article={select.article}
        onNavigate={callbacks.onNavigate}
        addToBasket={callbacks.addToBasket}
      >
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      </ArticleLayout>
    </Layout>
  )
}

export default React.memo(Article);
