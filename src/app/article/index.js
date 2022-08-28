import React, {useCallback} from 'react';
import {
  shallowEqual,
  useSelector as useSelectorRedux,
  useStore as useStoreRedux
} from 'react-redux';
import {useParams} from 'react-router-dom';
import ArticleCard from '../../components/article-card';
import Layout from '../../components/layout';
import LayoutComments from '../../components/layout-comments';
import Spinner from '../../components/spinner';
import HeadContainer from '../../containers/head';
import ToolsContainer from '../../containers/tools';
import TopContainer from '../../containers/top';
import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import actionsArticle from '../../services/store-redux/article/actions';
import actionsComments from '../../services/store-redux/comments/actions';

function Article() {
  const store = useStore();
  // Параметры из пути /articles/:id
  const params = useParams();

  const storeRedux = useStoreRedux();

  useInit(async () => {
    //await store.get('article').load(params.id);
    storeRedux.dispatch(actionsArticle.load(params.id));
    storeRedux.dispatch(actionsComments.load(params.id));
  }, [params.id]);

  const select = useSelectorRedux(
    state => ({
      article: {
        data: state.article.data,
        waiting: state.article.waiting
      },
      comments: {
        waiting: state.comments.waiting,
        items: state.comments.items,
        total: state.comments.total,
        form: state.comments.form
      }
    }),
    shallowEqual
  );

  const {t} = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    onAnswer: useCallback(_id => {
      storeRedux.dispatch(actionsComments.setForm({_id, _type: 'comment'}));
    }, [])
  };
  return (
    <Layout>
      <TopContainer />
      <HeadContainer title={select.article.data.title || ''} />
      <ToolsContainer />
      <Spinner active={select.article.waiting}>
        <ArticleCard article={select.article.data} onAdd={callbacks.addToBasket} t={t} />
      </Spinner>
      <Spinner active={select.comments.waiting}>
        {
          <LayoutComments
            comments={select.comments.items}
            total={select.comments.total}
            formPlacement={select.comments.form._id}
            articleId={select.article.data._id}
            onAnswer={callbacks.onAnswer}
          />
        }
      </Spinner>
    </Layout>
  );
}

export default React.memo(Article);
