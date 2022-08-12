import React from "react";
import "./style.css";

const Pagination = ({ pagination, setPagination }) => {
  const pages = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ];

  const newPages = () => {
    if (pagination === pages[0] || pagination === pages[1]) {
      return [...pages.slice(0, 3), "...", pages[pages.length - 1]];
    }

    if (pagination === pages[2]) {
      return [...pages.slice(0, 4), "...", pages[pages.length - 1]];
    }

    if (
      pagination === pages[pages.length - 1] ||
      pagination === pages[pages.length - 2]
    ) {
      return [pages[0], "...", ...pages.slice(-3)];
    }

    if (pagination === pages[pages.length - 3]) {
      return [pages[0], "...", ...pages.slice(-4)];
    }

    const arr = pages.filter(
      (page) =>
        page === pagination - 1 ||
        page === pagination ||
        page === pagination + 1
    );

    return [pages[0], "...", ...arr, "...", pages[pages.length - 1]];
  };

  console.log();

  return (
    <div className="pagination">
      <ul>
        {newPages().map((page, index) => {
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
