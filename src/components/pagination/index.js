import React from 'react'
import propTypes from 'prop-types'
import { cn } from '@bem-react/classname'
import './styles.css'
import usePagination from '../../utils/use-pagination'

function Pagination({
  current,
  total,
  changePage
}) {
  const bem = cn("Pagination")
  const elems = usePagination(current, total)

  return (
    <div className={bem()}>
      {
        elems.map((el, idx) => (
        <div className={ bem('item', {
          selected: el === current, 
          dots: el === '...', 
          unselected: !['...', current].includes(el)
        }) } key={idx} /* Можем вот так забить на key, всё равно всё ререндериться кроме первого и иногда последнего с точками будет */ 
             onClick={['...', current].includes(el) 
             ? null 
             : changePage(el)}>
          {el}
        </div>))
      }
    </div>
  )
}

Pagination.propTypes = {
  total: propTypes.number,
  current: propTypes.number,
  changePage: propTypes.func
}

Pagination.defaultProps = {
  total: 1,
  current: 1,
  changePage: () => {}
}

export default React.memo(Pagination)