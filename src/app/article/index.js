import React, {useState, useCallback, useEffect} from 'react'
import {useParams, Link, useLocation} from 'react-router-dom';
import propTypes from 'prop-types';
import useStore from "../../utils/use-store";
import useSelector from '../../utils/use-selector';
import {cn as bem} from "@bem-react/classname";
import BasketSimple from "../../components/basket-simple";
import Controls from '../../components/controls';
import Translate from '../../components/translate';
import numberFormat from '../../utils/number-format';
import ProgressBar from '../../components/ui/progress-bar';
import './style.css'

function Article(props) {

  console.log('Article');

  const cn = bem('Article')
  const store = useStore()
  const {_id} = useParams()
  const location = useLocation()
  const select = useSelector(state => ({
    error: state.catalog.error
  }));

  const [isloading, setIsLoading] = useState(null)

  const callbacks = {
    // Добавление товара в корзину со страницы товара
    onAdd: useCallback((e) => props.onAdd(props.article._id), [props.onAdd, props.article]),
  };

  useEffect(() => {
    setIsLoading(true)
    store.get('catalog').loadArticle(_id).then(() => {
      setIsLoading(false)
    })
  // в определенный момент страница товара может быть открытой,
  // поэтому, чтобы подгрузить новую из корзины, будем отслеживать текущий location
  }, [location])

  return (
    <>
      <Link to='/' className='MainPageLink'><Translate>Главная</Translate></Link>
      {isloading 
        ? <ProgressBar /> 
        : select.error
        ? <div className='errorMsg'>{error}</div>
        : <div className={cn()}>
            <p className={cn('description')}>{props.article.description}</p>
            <ul className={cn('specGroup')}>
              <li className={cn('spec')}>
                <Translate>Страна производитель</Translate>:{" "}
                <span className={cn('spec', {value: true})}>
                  {props.article.maidIn?.title} [{props.article.maidIn?.code}]
                </span>
              </li>
              <li className={cn('spec')}>
                <Translate>Категория</Translate>: {" "}
                <span className={cn('spec', {value: true})}>{props.article.category?.title}</span>
                </li>
              <li className={cn('spec')}>
                <Translate>Год выпуска</Translate>: {" "}
                <span className={cn('spec', {value: true})}>{props.article.edition}</span>
              </li>
              <li className={cn('spec', {price: true})}>
                <Translate>Цена</Translate>: {numberFormat(props.article.price)} ₽
              </li>
            </ul>
            <Controls onAdd={callbacks.onAdd}/>
          </div>
      }
    </>
  )
}

export default React.memo(Article)

Article.propTypes = {
  article: propTypes.object.isRequired,
  loadArticle: propTypes.func,
  onAdd: propTypes.func
}

Article.defaultProps = {
  loadArticle: () => {},
  onAdd: () => {}
}