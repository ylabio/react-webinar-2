import React, { useCallback, useEffect } from 'react';
import useStore from '../../utils/hooks/use-store';
import { useParams } from 'react-router-dom';
import useSelector from '../../utils/hooks/use-selector';
import ArticleInfo from '../../components/article-info';
import useLang from '../../utils/hooks/use-lang';
import CommonLayout from '../../containers/common-layout';

const Article = () => {
  const { articleInfo } = useLang();
  const store = useStore();
  const { articleId } = useParams();
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
    <CommonLayout head={data?.name || ' '}>
      <div>
        {loading ? (
          <div style={{ padding: '20px' }}>loading...</div>
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
