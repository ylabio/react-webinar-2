import React, {useEffect} from 'react';
import {cn as bem} from '@bem-react/classname';
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import './style.css';


function ArticleCategory() {
  const cn = bem('ArticleCategory');

  const store = useStore();

  const select = useSelector(state => ({
    article: state.catalog.article,
    category: state.catalog.category,
  }));

  useEffect(() => {
    store.get('catalog').loadCategory(select.article?.category._id);
  }, [select.article]);

  return (
    <>
      <span className={cn('bold')}>{select.category?.title}</span>
    </>)
}

export default React.memo(ArticleCategory);
