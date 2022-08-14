import React, { useEffect, useMemo } from "react";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import propTypes from "prop-types";
import useStore from "../../utils/use-store";

function Pagination({ countTotal, pageSize, pageCurrent, pageChanged }) {
  const cn = bem("Pagination");

  const dots = "...";

  const paginPages = useMemo(() => {
    let pagesCount = Math.ceil(countTotal / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
    if (pages.length < 5 || (pages.length === 5 && pageCurrent === 3))
      return pages;
    if ([1, 2].includes(pageCurrent)) return [1, 2, 3, dots, pagesCount];
    if (pageCurrent === 3) return [1, 2, 3, 4, dots, pagesCount];
    if ([pagesCount - 1, pagesCount].includes(pageCurrent))
      return [1, dots, pagesCount - 2, pagesCount - 1, pagesCount];
    if (pageCurrent === pagesCount - 2)
      return [
        1,
        dots,
        pagesCount - 3,
        pagesCount - 2,
        pagesCount - 1,
        pagesCount,
      ];
    return [
      1,
      dots,
      pageCurrent - 1,
      pageCurrent,
      pageCurrent + 1,
      dots,
      pagesCount,
    ];
  }, [pageCurrent, countTotal]);

  const store = useStore();

  useEffect(() => {
    store.get("catalog").load();
  }, [pageCurrent]);

  return (
    <div className={cn()}>
      {paginPages.map((p, index) =>
        p === dots || p === pageCurrent ? (
          <div
            className={cn("page", {
              selected: pageCurrent === p,
              dots: dots === p,
            })}
            key={index}
          >
            {p}
          </div>
        ) : (
          <div
            className={cn("page", {
              unselected: pageCurrent !== p,
            })}
            key={index}
            onClick={() => {
              pageChanged(p);
            }}
          >
            {p}
          </div>
        )
      )}
    </div>
  );
}

Pagination.propTypes = {
  countTotal: propTypes.number,
  pageSize: propTypes.number,
  pageCurrent: propTypes.number,
  pageChanged: propTypes.func,
};

Pagination.defaultProps = {
  countTotal: 0,
  pageSize: 3,
  pageCurrent: 1,
  pageChanged: () => {},
};

export default React.memo(Pagination);
