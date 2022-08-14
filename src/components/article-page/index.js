import React, { useCallback, useEffect, useState } from 'react';
import Layout from '../layout';
import BasketSimple from '../basket-simple';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import ArticleInfo from '../article-info';
import { useParams } from 'react-router-dom';

function ArticlePage() {
  const store = useStore();
  const [articleInfo, setArticleInfo] = useState();

  const { id } = useParams();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  console.log('ArticlePage');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `api/v1/articles/${id}?lang=ru&fields=*,maidIn(title,code),category(title)`
      );
      const article =  await response.json();
      setArticleInfo(article.result);
    };
    fetchData();    
  }, []);

  const callbacks = {
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  if (!articleInfo) {
    return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px'}}>Идет загрузка...</div>;
  }

  return (
    <Layout head={<h1>{articleInfo.title}</h1>}>
      <BasketSimple
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <ArticleInfo data={articleInfo} onAdd={callbacks.addToBasket} />
    </Layout>
  );
}

export default React.memo(ArticlePage);
