import React from 'react';
import propTypes from "prop-types";
import {Link} from 'react-router-dom';
import {cn as bem} from '@bem-react/classname'
import './style.css';

function Pagination(props) {
  const cn = bem('Pagination');
  const {page, limit, sort, filter, query} = props.params

  // Количество страниц
  const length = Math.ceil(props.count / Math.max(limit, 1));

  // Номера слева и справа относительно активного номера, которые остаются видимыми
  let left = Math.max(page - props.indent, 1);
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

  // Возвращает функцию с замыканием на номер страницы
  const onClickHandler = page => {
    return () => props.onChange(page);
  };

  return (
    <ul className={cn()}>
      {items.map((number, index) => 
        number ?
          <li key={index}
              className={cn('item', {active: number === page, split: !number})}
              onClick={onClickHandler(number)}
          >
            <Link className={cn('link')} 
                  to={`/?page=${number}&limit=${limit}&sort=${sort}&filter=${filter}&query=${query}`} 
                  onClick={(e) => e.preventDefault()}
            >
              {number}
            </Link>
          </li>
        :
          <span key={index} className={cn('dots')}>...</span>
      )}
    </ul>
  )
}

Pagination.propTypes = {
  params: propTypes.shape({
    page: propTypes.number.isRequired,
    limit: propTypes.number,
    sort: propTypes.string,
    filter: propTypes.string,
    query: propTypes.string
  }).isRequired,
  count: propTypes.number,
  onChange: propTypes.func,
  indent: propTypes.number
}

Pagination.defaultProps = {
  params: {
    page: 1,
    limit: 10,
    sort: '',
    filter: '',
    query: ''
  },
  count: 1000,
  indent: 1,
  onChange: () => {
  },
}

export default React.memo(Pagination);
