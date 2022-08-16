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
  const { data, loading } = useSelector((state) => state.article);

  const callbacks = {
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
  };

  useEffect(() => {
    store.get('article').loadArticle(articleId);
    return () => {
      store.get('article').clearArticle();
    };
  }, [articleId]);

  return (
    <CommonLayout>
      <div className={cn()}>
        {loading ? (
          <div>loading...</div>
        ) : (
          <>
            {data && <ArticleInfo article={data} ln={articleInfo} onAdd={callbacks.addToBasket} />}
          </>
        )}
      </div>
    </CommonLayout>
  );
};

export default Article;
