import React from "react";
import { newPages } from "../../utils/pages";
import "./style.css";

const Pagination = ({ pagination, pagesAmount, setPagination }) => {
  const pages = [];

  for (let i = 1; i < pagesAmount + 1; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <ul>
        {newPages(pagination, pages).map((page, index) => {
          if (typeof page === "string") {
            return (
              <li key={`${page}_${index}`} className="points">
                {page}
              </li>
            );
          }
          return (
            <li
              key={`${page}_${index}`}
              onClick={() => setPagination(page)}
              className={`${
                page === pagination ? "activePage" : "pagination-list"
              }`}
            >
              {page}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default React.memo(Pagination);
