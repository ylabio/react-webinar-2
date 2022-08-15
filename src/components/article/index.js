import React, {useCallback, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';
import numberFormat from '../../utils/numberFormat';
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Layout from '../layout';
import BasketSimple from '../basket-simple';
import ArticleCountry from "../article-country/article-country";
import ArticleCategory from "../article-category/article-category";
import './style.css';

function Article() {

  console.log('Article');

  const cn = bem('Article');
  const navigate = useNavigate();
  const {articleId} = useParams();
  const store = useStore();

  useEffect(() => {
    store.get('catalog').loadArticle(articleId);
  }, [articleId]);

  const select = useSelector(state => ({
    items: state.catalog.items,
    article: state.catalog.article,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    addToBasket: useCallback(_id => store.get('basket').addToBasket(articleId), [])
  };

  return (
    <div className={cn()}>
      <Layout head={<h1>{select.article?.title}</h1>}>
        <div>
          <div className={cn('basket-simple')}>
            <span className={cn('link-to-main')}
                  onClick={() => navigate('/')}>Главная</span>
            <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
          </div>
        </div>
        <div className={cn('full-info')}>
          <ul className={cn('ul')}>
            <li className={cn('li')}>
              <p className={cn('description')}>{select.article?.description}</p>
            </li>
            <li className={cn('li')}>Страна производитель:&nbsp;
              <ArticleCountry/>
            </li>
            <li className={cn('li')}>Категория:&nbsp;
              <ArticleCategory/>
            </li>
            <li className={cn('li')}>Год выпуска:&nbsp;<span
              className={cn('li-bold')}>{select.article?.edition}</span></li>
            <li className={cn('description-li')}><span
              className={cn('li-bold')}>Цена:{' '}{numberFormat(select.article?.price)}&nbsp;&#8381;</span></li>
          </ul>
          <button className={cn('add-button')} onClick={callbacks.addToBasket}>Добавить</button>
        </div>
      </Layout>
    </div>
  )
}

export default React.memo(Article);
