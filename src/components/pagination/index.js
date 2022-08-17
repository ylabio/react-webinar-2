import React from "react";
import propTypes from "prop-types";
import { getPagesArray } from "../../utils/pages";
import "./style.css";

function Pagination({ totalPages, currentPage, changePage }) {
  let pagesArray = getPagesArray(totalPages, currentPage);

  return (
    <div className="page__wrapper">
      {pagesArray.map(function (page) {
        if (page >= 1) {
          return (
            <span
              onClick={() => changePage(page)}
              key={page}
              className={currentPage === page ? "page page__current" : "page"}
            >
              {page}
            </span>
          );
        } else {
          return (
            <div className="dots" key={page}>
              ...
            </div>
          );
        }
      })}
    </div>
  );
}

Pagination.propTypes = {
  totalPages: propTypes.number,
  currentPage: propTypes.number.isRequired,
  changePage: propTypes.func.isRequired,
};

Pagination.defaultProps = {
  totalPages: 0,
};

export default React.memo(Pagination);
