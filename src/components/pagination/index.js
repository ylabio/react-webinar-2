import React, { useCallback, useMemo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Pagination(props) {
  const { maxPages, currentPage, onSetPage } = props;
  const cn = bem("Pagination");

  const handleClickPage = useCallback(
    (e) => {
      const page = e.target.textContent;
      if (page == currentPage) return;
      onSetPage(page - 1);
    },
    [currentPage]
  );

  const pagesList = useMemo(() => {
    const array = Array.from({ length: maxPages }, (_, i) => i + 1).slice(1, maxPages - 1);
    if (maxPages < 6) return array;
    if (currentPage === maxPages) return array.slice(currentPage - 4, currentPage);
    if (currentPage === 1) return array.slice(0, currentPage + 1);
    if (currentPage - 3 < 0) return array.slice(0, currentPage);
    return array.slice(currentPage - 3, currentPage);
  }, [maxPages, currentPage]);

  return (
    <ul className={cn()}>
      <li className={cn("page", { active: currentPage === 1 })} onClick={handleClickPage}>
        {1}
      </li>
      {currentPage > 3 && maxPages >= 6 && <span>{` ... `}</span>}
      {pagesList.map((page) => (
        <li key={page} className={cn("page", { active: currentPage === page })} onClick={handleClickPage}>
          {page}
        </li>
      ))}
      {currentPage < maxPages - 2 && maxPages >= 6 && <span>{` ... `}</span>}
      {maxPages !== 1 && (
        <li className={cn("page", { active: currentPage === maxPages })} onClick={handleClickPage}>
          {maxPages}
        </li>
      )}
    </ul>
  );
}

export default React.memo(Pagination);
