import React from "react";
import { Navigate, useLocation, Link } from "react-router-dom";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Pagination(props) {
  const cn = bem("Pagination");
  const url = window.location.search;

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
  for (let page = left; page <= right; page++) items.push(page);
  // Пропуск
  if (right < length - 1) items.push(null);
  // Последнаяя страница
  if (right < length) items.push(length);

  // Возвращает функцию с замыканием на номер страницы
  const onClickHandler = (page) => {
    return () => props.onChange(page);
  };

  return (
    <ul className={cn()}>
      {items.map((number, index) =>
        number ? (
          <Link to={url.replace(/page=[^&]*/i, `/page=${number}`)} key={index}>
            <li
              key={index}
              className={cn("item", {
                active: number === props.page,
              })}
              onClick={onClickHandler(number)}
            >
              {number}
            </li>
          </Link>
        ) : (
          <li key={index} className={cn("item_split")}>
            {"..."}
          </li>
        )
      )}
    </ul>
  );
}

Pagination.propTypes = {
  page: propTypes.number.isRequired,
  limit: propTypes.number,
  count: propTypes.number,
  onChange: propTypes.func,
  indent: propTypes.number,
};

Pagination.defaultProps = {
  page: 1,
  limit: 10,
  count: 1000,
  indent: 1,
  onChange: () => {},
};

export default React.memo(Pagination);
