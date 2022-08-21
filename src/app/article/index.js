import React, {useCallback} from 'react';
import {useParams} from 'react-router-dom';
import ArticleCard from '../../components/article/article-card';
import Spinner from '../../components/common/spinner';
import Layout from '../../components/layouts/layout';
import LayoutFlex from '../../components/layouts/layout-flex';
import CommonTopbar from '../../containers/common-topbar';
import LocaleSelect from '../../containers/locale-select';
import Tools from '../../containers/tools';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

function Article() {
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

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), [])
  };

  return (
    <Layout
      head={
        <LayoutFlex flex='between'>
          <h1>{select.article.title}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }
      topbar={<CommonTopbar redirectPage={`articles/${select.article._id}`} />}
    >
      <Tools />
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
      </Spinner>
    </Layout>
  );
}

export default React.memo(Article);
