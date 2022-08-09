import React from 'react'
import { cn as bem } from '@bem-react/classname'
import plural from 'plural-ru'
import './style.css'
import propTypes from 'prop-types'
import Controls from '../controls'

function PageHeader(props) {
  const cn = bem('PageHeader')

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <span>В корзине: </span>
        <span className={cn('quantity')}>
          {' '}
          {props.arrLength
            ? props.arrLength +
              ' ' +
              plural(props.arrLength, 'товар', 'товарa', 'товаров') +
              ' / ' +
              props.sum +
              '  ₽'
            : 'пусто'}
        </span>
      </div>
      <div className={cn('button')}>
        <Controls clickHandler={props.clickBtn} title={props.titleBtn} />
      </div>
    </div>
  )
}

PageHeader.propTypes = {
  arrLength: propTypes.number,
  sum: propTypes.number,
  titleBtn: propTypes.string,
  clickBtn: propTypes.func,
}

PageHeader.defaultProps = {}

export default React.memo(PageHeader)
