import React, { useEffect, useState, useCallback } from 'react'
import propTypes from 'prop-types'
import { cn as bem } from '@bem-react/classname'
import './style.css'

function Pagination({ limit, count, changeNumber, currentPage = 1, setCurrentPage }) {
  const cn = bem('Pagination')

  const callbacks = {
    changeNumberPage: useCallback((number) => {
      const skip = (number - 1) * limit
      setCurrentPage(number)
      changeNumber(skip)
    }, []),
  }

  const numbers = Math.ceil(count / limit)

  const pageNumbers = () => {
    let pageNumbers = []
    for (let i = 1; i <= numbers; i++) {
      if (
        (i === numbers && i !== currentPage && i !== currentPage - 1) ||
        (i === 1 && i !== currentPage && i !== currentPage - 1)
      ) {
        pageNumbers.push(i)
      } else if (i === 1 && i === currentPage) {
        pageNumbers.push(i, i + 1, i + 2)
      } else if (i === currentPage && i !== numbers && i !== 1 && i !== numbers - 1) {
        pageNumbers.push(i - 1, i, i + 1)
      } else if (i === currentPage && i !== numbers && i !== 1 && i === numbers - 1) {
        pageNumbers.push(i - 1, i)
      } else if (i === numbers && i === currentPage) {
        pageNumbers.push(i - 2, i - 1, i)
      } else if (
        (currentPage < numbers && i > 2 && i < numbers - 1) ||
        (currentPage === numbers && i > 2 && i < numbers - 2)
      ) {
        pageNumbers.push(null)
      }
    }
    pageNumbers = pageNumbers.filter((item, i, arr) => item !== arr[i - 1])
    return pageNumbers
  }

  return (
    <div className={cn()}>
      {pageNumbers().map((number, i) => {
        return number ? (
          <div
            key={i}
            className={number === currentPage ? cn('item-active') : cn('item')}
            onClick={() => callbacks.changeNumberPage(number)}>
            {number}
          </div>
        ) : (
          <div key={i} className={cn('item-ellipsis')}>
            ...
          </div>
        )
      })}
    </div>
  )
}

Pagination.propTypes = {
  limit: propTypes.number.isRequired,
  count: propTypes.number.isRequired,
  changeNumber: propTypes.func,
  setCurrentPage: propTypes.func,
  currentPage: propTypes.number,
}

Pagination.defaultProps = {
  changeNumber: () => {},
}

export default React.memo(Pagination)
