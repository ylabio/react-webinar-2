import React from "react"

/**
 * Возвращает jsx разметку для пагинации в зависимости от входящих данных
 * @param page страница, по которой кликнул пользователь
 * @param nextPage номер страницы, по которой кликнул пользователь, удовлетворяющей условию (nextPage > 3 && nextPage < lastPage - 2)
 * @param lastPage номер последней страницы
 * @param func передаваемая функция
 * @param btnClass css класс для кнопок
 * @returns {JSX}
 */

export default function switchPaginationRender(page, nextPage, lastPage, func, btnClass) {
  switch (page) {
    case 1:
      return (
        <>
          <button className={`${btnClass} current`} onClick={() => func(1)}>1</button>
          <button className={btnClass} onClick={() => func(2)}>2</button>
          <button className={btnClass} onClick={() => func(3)}>3</button>
          <button className={`${btnClass} dots`}>...</button>
          <button className={btnClass} onClick={() => func(lastPage)}>{lastPage}</button>
        </>
      )
    case 2:
      return (
        <>
          <button className={btnClass} onClick={() => func(1)}>1</button>
          <button className={`${btnClass} current`} onClick={() => func(2)}>2</button>
          <button className={btnClass} onClick={() => func(3)}>3</button>
          <button className={`${btnClass} dots`}>...</button>
          <button className={btnClass} onClick={() => func(lastPage)}>{lastPage}</button>
        </>
      )
    case 3:
      return (
        <>
          <button className={btnClass} onClick={() => func(1)}>1</button>
          <button className={btnClass} onClick={() => func(2)}>2</button>
          <button className={`${btnClass} current`} onClick={() => func(3)}>3</button>
          <button className={btnClass} onClick={() => func(4)}>4</button>
          <button className={`${btnClass} dots`}>...</button>
          <button className={btnClass} onClick={() => func(lastPage)}>{lastPage}</button>
        </>
      )
    case (lastPage - 2):
      return (
        <>
          <button className={btnClass} onClick={() => func(1)}>1</button>
          <button className={`${btnClass} dots`}>...</button>
          <button className={btnClass} onClick={() => func(lastPage - 3)}>{lastPage - 3}</button>
          <button className={`${btnClass} current`} onClick={() => func(lastPage - 2)}>{lastPage - 2}</button>
          <button className={btnClass} onClick={() => func(lastPage - 1)}>{lastPage - 1}</button>
          <button className={btnClass} onClick={() => func(lastPage)}>{lastPage}</button>
        </>
      )
    case (lastPage - 1):
      return (
        <>
          <button className={btnClass} onClick={() => func(1)}>1</button>
          <button className={`${btnClass} dots`}>...</button>
          <button className={btnClass} onClick={() => func(lastPage - 2)}>{lastPage - 2}</button>
          <button className={`${btnClass} current`} onClick={() => func(lastPage - 1)}>{lastPage - 1}</button>
          <button className={btnClass} onClick={() => func(lastPage)}>{lastPage}</button>
        </>
      )
    case (lastPage):
      return (
        <>
          <button className={btnClass} onClick={() => func(1)}>1</button>
          <button className={`${btnClass} dots`}>...</button>
          <button className={btnClass} onClick={() => func(lastPage - 2)}>{lastPage - 2}</button>
          <button className={btnClass} onClick={() => func(lastPage - 1)}>{lastPage - 1}</button>
          <button className={`${btnClass} current`} onClick={() => func(lastPage)}>{lastPage}</button>
        </>
      )
    case nextPage:
      if (nextPage > 3 && nextPage < lastPage - 2) {
        return (
          <>
            <button className={btnClass} onClick={() => func(1)}>1</button>
            <button className={`${btnClass} dots`}>...</button>
            <button className={btnClass} onClick={() => func(nextPage - 1)}>{nextPage - 1}</button>
            <button className={`${btnClass} current`} onClick={() => func(nextPage)}>{nextPage}</button>
            <button className={btnClass} onClick={() => func(nextPage + 1)}>{nextPage + 1}</button>
            <button className={`${btnClass} dots`}>...</button>
            <button className={btnClass} onClick={() => func(lastPage)}>{lastPage}</button>
          </>
        )
      }
  }
};
