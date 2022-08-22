import React, {useCallback} from "react";
import { useParams } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";

import ArticleCard from "../../components/article-card";
import Spinner from "../../components/spinner";
import Tools from "../../containers/tools";
import LayoutPage from "../../layouts/layout-page";
import LayoutFlex from "../../layouts/layout-flex";
import LocaleSelect from "../../containers/locale-select";
import UserPreview from '../../containers/user-preview';

function Article(){
  const store = useStore();
  const params = useParams();
  const { t } = useTranslate();

  useInit(async () => {
    await store.get('article').load(params.id);
  }, [params.id]);

  const select = useSelector(state => ({
    article: state.article.data,
    waiting: state.article.waiting,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  return (
    <LayoutPage head={<>
      <UserPreview />
      <LayoutFlex place="row-between">
        <h1>{select.article.title}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    </>}>
      <Tools/>
      <Spinner active={select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t}/>
      </Spinner>
    </LayoutPage>
  )
}

export default React.memo(Article);
