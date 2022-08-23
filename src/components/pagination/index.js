import React from 'react';
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function Pagination(props) {
  const cn = bem('Pagination');
  // Количество страниц
  const length = Math.ceil(props.count / Math.max(props.limit, 1));

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

  // Возвращает функцию с замыканием на номер страницы
  const onClickHandler = page => {
    return () => props.onChange(page);
  };

  // Устанавливает ссылку для открытия страницы
  const setLink = (numberPage) => { 

    const urlArr = window.location.search.split('&');
    const pageUrl = urlArr.find(i => i.includes('page'));

    if (pageUrl != undefined) {
      const pageNum = pageUrl.split('=');
      pageNum[1] = String(numberPage);
      const newPageUrl = pageNum.join('=');
      const newUrlArr = urlArr.map(i => i.includes('page') ? i = newPageUrl : i);
      const urlSearch = newUrlArr.join('&');
      const totalUrl = `${window.location.protocol}//${window.location.host}/${urlSearch}`

    return totalUrl;

    } else{
      
      return 'http://localhost:8010/?page=1&limit=10&sort=order&query=&category=';
      
    }
  }
  
  return (
    <ul className={cn()}>
      {items.map((number, index) => (
        <li key={index}
            className={cn('item', {active: number === props.page, split: !number})}
            onClick={typeof number === 'number' ? onClickHandler(number) : null}
        >
         {typeof number === 'number' ? <a href={setLink(number)} onClick={(e) => e.preventDefault()}>{number}</a> : '...'}
        </li>
      ))}
    </ul>
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
