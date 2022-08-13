import React, { useCallback, useEffect } from 'react';
import CommonLayout from '../../containers/common-layout';
import useStore from '../../utils/hooks/use-store';
import { useParams } from 'react-router-dom';
import useSelector from '../../utils/hooks/use-selector';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import ArticleInfo from '../../components/article-info';
import useLang from '../../utils/hooks/use-lang';

const Article = () => {
  const { articleInfo } = useLang();
  const store = useStore();
  const { articleId } = useParams();
  const cn = bem('Article');
  const { currentArticle } = useSelector((state) => state.catalog);

  const callbacks = {
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
  };

  useEffect(() => {
    store.get('catalog').loadArticle(articleId);
    return () => {
      store.get('catalog').clearCurrArticle();
    };
  }, []);

  return (
    <CommonLayout>
      <div className={cn()}>
        {!currentArticle ? (
          <div>loading...</div>
        ) : (
          <ArticleInfo
            article={currentArticle}
            ln={articleInfo}
            onAdd={callbacks.addToBasket}
          />
        )}
      </div>
    </CommonLayout>
  );
};

export default Article;
