import React, { useMemo } from 'react'
import propTypes from 'prop-types'
import { cn } from '@bem-react/classname'
import './styles.css'

function Pagination({
  current,
  total,
  changePage
}) {
  const bem = cn("Pagination")

  const elems = useMemo(() => {
    const raw = Array.from({length: total}, (_, x) => x + 1)

    if (raw.length < 5 || current === 3 && raw.length === 5) return raw
    if ([1, 2].includes(current)) return [1, 2, 3, '...', total]
    if (current === 3) return [1, 2, 3, 4, '...', total]
    if ([total - 1, total].includes(current)) return [1, '...', total - 2, total - 1, total]
    if (current === total - 2) return [1, '...', total - 3, total - 2, total - 1, total]

    return [1, '...', current - 1, current, current + 1, '...', total]
  }, [current, total])

  return (
    <div className={bem()}>
      {
        elems.map((el, idx) => (
        <div className={ bem('item', {
          selected: el === current, 
          dots: el === '...', 
          unselected: !['...', current].includes(el)
        }) } key={idx} 
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