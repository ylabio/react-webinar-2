import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Pagination({ pageCount, currentPage, changePage }) {
  const cn = bem("Pagination");

  const elements = React.useMemo(() => {
    if (pageCount === 3) return [1, 2, 3];
    if (currentPage === 3 && pageCount === 4) return [1, 2, 3, 4];
    if (currentPage < 3 && pageCount > 4) return [1, 2, 3, "...", pageCount];
    if (currentPage === 3 && pageCount > 4)
      return [1, 2, 3, 4, "...", pageCount];
    if (currentPage === pageCount - 1)
      return [1, "...", currentPage - 1, currentPage, pageCount];
    if (currentPage === pageCount - 2)
      return [1, "...", pageCount - 2, pageCount - 1, pageCount];
    if (currentPage === pageCount)
      return [1, "...", currentPage - 2, currentPage - 1, currentPage];
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      pageCount,
    ];
  }, [currentPage, pageCount]);

  return (
    <div className={cn()}>
      {elements.map((item, idx) => (
        <div
          className={cn("item", {
            active: item === currentPage,
            dots: item === "...",
            unselected: !["...", currentPage].includes(item),
          })}
          key={idx}
          onClick={
            ["...", currentPage].includes(item) ? null : changePage(item)
          }
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default React.memo(Pagination);
