import React, {useCallback} from 'react'
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import Translate from '../../components/translate';
import numberFormat from '../../utils/number-format';
import './style.css'

function ItemDetailed(props) {
  const cn = bem('ItemDetailed')

  const callbacks = {
    onAdd: useCallback((e) => props.onAdd(props.article._id), [props.onAdd, props.article])
  };

  if (props.error) {
    return <div className={cn('error')}>{props.error}</div>
  }

  return (
    <div className={cn()}>
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
      <button onClick={callbacks.onAdd}><Translate>Добавить</Translate></button>
    </div>
  )
}

export default React.memo(ItemDetailed)

ItemDetailed.propTypes = {
  article: propTypes.object.isRequired,
  onAdd: propTypes.func
}