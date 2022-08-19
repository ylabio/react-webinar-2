import React, {useCallback, useMemo, useState} from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname'
import './style.css';
import {Link} from "react-router-dom";
import qs from "qs";
import QS_OPTIONS from "qs";

function Pagination(props) {
  const cn = bem('Pagination');
  // Количество страниц
  const length = Math.ceil(props.count / Math.max(props.limit, 1));

  // Колбек на смену страницы
  const cb = {
    onClickHandler: useCallback(number => props.onChange(number), [window.location]),
  };

  // Формирование ссылок для страниц пагинации
  const createLink = (page) => {
    const path = window.location;
    let obj = qs.parse(path.search.slice(1));
    obj = {
      ...obj,
      page: page
    }
    return qs.stringify(obj, QS_OPTIONS.stringify);
  }

  // Номера слева и справа относительно активного номера, которые остаются видимыми
  let left = Math.max(props.page - props.indent, 1);
  let right = Math.min(left + props.indent * 2, length);
  // Корректировка когда страница в конце
  left = Math.max(right - props.indent * 2, 1);

  // Массив номеров, чтобы удобней рендерить
  let items = [];
  // Первая страница всегда нужна
  if (left > 1) items.push(1);
  // Пропуск
  if (left > 2) items.push(null);
  // Последваотельность страниц
  for (let page = left; page <= right; page++) items.push(page)
  // Пропуск
  if (right < length - 1) items.push(null);
  // Последнаяя страница
  if (right < length) items.push(length);

  return (
    <div className={cn()}>
      {items.map((number, index) => (
        // Функция createLink формирует и возвращает путь для ссылки страницы пагинации
        <Link to={`/?${createLink(number)}`}
              key={index}
              className={cn('item', {active: number === props.page, split: !number})}
              onClick={() => cb.onClickHandler(number)}
        >
          {number || '...'}
        </Link>
      ))}
    </div>
  )
}

Pagination.propTypes = {
  page: propTypes.number.isRequired,
  limit: propTypes.number,
  count: propTypes.number,
  onChange: propTypes.func,
  indent: propTypes.number
}

Pagination.defaultProps = {
  page: 1,
  limit: 10,
  count: 1000,
  indent: 1,
  onChange: () => {
  },
}

export default React.memo(Pagination);
