import React, {useEffect} from 'react';
import {cn as bem} from '@bem-react/classname';
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import './style.css';


function ArticleCountry() {
  const cn = bem('ArticleCountry');

  const store = useStore();

  const select = useSelector(state => ({
    article: state.catalog.article,
    country: state.catalog.country,
  }));

  useEffect(() => {
    store.get('catalog').loadCountry(select.article?.maidIn._id);
  }, [select.article]);

  return (
    <>
      <span className={cn('bold')}>{select.country?.title ?
        select.country.title : 'страна происхождения неизвестна'}&nbsp;
        {select.country?.code ? `(${select.country?.code})` : null}</span>
    </>)
}

export default React.memo(ArticleCountry);