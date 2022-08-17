import React, { useEffect, useRef, useCallback } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import pagination from "../../utils/pagination";
import "./style.css";

function Pagination(props) {
  const cn = bem("Pagination");
  const { count, limit, page } = props;
  let pages = [];
  let startPage = 1;
  let endPage = Math.ceil(count / limit);

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
