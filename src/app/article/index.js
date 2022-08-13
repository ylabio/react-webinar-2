import React, {useState, useCallback, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom';
import propTypes from 'prop-types';
import useSelector from '../../utils/use-selector';
import {cn as bem} from "@bem-react/classname";
import Controls from '../../components/controls';
import Translate from '../../components/translate';
import numberFormat from '../../utils/number-format';
import ProgressBar from '../../components/ui/progress-bar';
import './style.css'

function Article(props) {
  const cn = bem('Article')
  const {_id} = useParams()
  const error = useSelector(state => state.catalog.error)
  const [isloading, setIsLoading] = useState(true)

  useEffect(() => {
    props.loadArticle(_id).then(() => {
      setIsLoading(false)
    })
  }, [])

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.article._id), [props.onAdd, props.article])
  };

  return (
    <>
      <Link to='/' className='MainPageLink'><Translate>Главная</Translate></Link>
      {isloading 
        ? <ProgressBar /> 
        : error
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

export default Article

Article.propTypes = {
  article: propTypes.object.isRequired,
  loadArticle: propTypes.func,
  onAdd: propTypes.func
}

Article.defaultProps = {
  loadArticle: () => {},
  onAdd: () => {}
}