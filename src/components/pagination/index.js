import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./styles.css";

const Pagination = ({ currentPage, allPages, setCurrentPage }) => {
  const cn = bem("Pagination");
  let pagesArray = [];
  if (currentPage === 1) {
    pagesArray = [1, 2, 3];
  } else if (currentPage === allPages) {
    pagesArray = [allPages - 2, allPages - 1, allPages];
  } else {
    pagesArray = [currentPage - 1, currentPage, currentPage + 1];
  }
  return (
    <div className={cn()}>
      {!pagesArray.includes(1) ? (
        <>
          <p
            onClick={() => setCurrentPage(1)}
            className={
                currentPage === 1 ? cn('Item-active') : cn('Item')
              /* "Pagination-item" +
              (currentPage === 1 ? " Pagination-item_active" : "") */
            }
          >
            1
          </p>
          {currentPage !== 3 ? <p className={cn("dots")}> ... </p> : ""}
        </>
      ) : (
        <></>
      )}
      {pagesArray.map((page, index) => (
        <p
          onClick={() => setCurrentPage(page)}
          className={currentPage === page ? cn('Item-active') : cn('Item')}
          key={index}>
          {page}
        </p>
      ))}

      {!pagesArray.includes(allPages) ? (
        <>
          {currentPage !== allPages - 2 ? (
            <p className={cn("dots")}> ... </p>
          ) : (
            <></>
          )}
          <p onClick={() => setCurrentPage(allPages)}>{allPages}</p>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

Pagination.propTypes = {
  currentPage: propTypes.number,
  allPages: propTypes.number,
  setCurrentPages: propTypes.func,
};

export default React.memo(Pagination);
