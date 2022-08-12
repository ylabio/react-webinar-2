import React, { useEffect, useRef, useCallback } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Pagination(props) {
  const cn = bem("Pagination");
  const { count, limit, page } = props;
  let pages = [];
  let startPage = 1;
  let endPage = Math.ceil(count / limit);

  function pagination(current, last) {
    let delta = 1,
      left = current - delta,
      right = current + delta,
      range = [],
      rangeWithDots = [],
      l;
    if (current === 1) right += 1;
    if (current === last) left -= 1;

    for (let i = 1; i <= last; i++) {
      if (i == 1 || i == last || (i >= left && i <= right)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots;
  }
  pages = pagination(page, endPage);
  const getPage = useCallback(
    (page) => {
      return (e) => props.onChange(page);
    },
    [props.onChange]
  );

  return (
    <div className={cn()}>
      {pages.map((item, index) => (
        <span
          key={index}
          className={cn("item", {
            active: item === page,
            skip: item === "...",
          })}
          onClick={getPage(item)}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

Pagination.propTypes = {
  page: propTypes.number.isRequired,
  count: propTypes.number,
  limit: propTypes.number,
  onChange: propTypes.func,
};

Pagination.defaultProps = {
  page: 1,
  count: 999,
  limit: 10,
  onChange: () => {},
};

export default Pagination;
