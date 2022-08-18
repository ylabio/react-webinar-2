import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import Page from "../page";

function Pagination({ pages, currentPage, setCurrentPage }) {
  const cn = bem("Pagination");

  const numberOfPages = [];
  for (let i = 1; i <= pages; i++) {
    numberOfPages.push(i);
  }

  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);

  useEffect(() => {
    let tempNumberOfPages = [...arrOfCurrButtons];

    if (numberOfPages.length < 6) {
      tempNumberOfPages = numberOfPages;
    } else if (currentPage >= 1 && currentPage <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, "...", numberOfPages.length];
    } else if (currentPage === 4) {
      const sliced = numberOfPages.slice(2, 5);
      tempNumberOfPages = [1, "...", ...sliced, "...", numberOfPages.length];
    } else if (currentPage > 4 && currentPage < numberOfPages.length - 2) {
      const sliced1 = numberOfPages.slice(currentPage - 2, currentPage);
      const sliced2 = numberOfPages.slice(currentPage, currentPage + 1); // sliced1 (5, 5+1) -> [6]
      tempNumberOfPages = [1, "...", ...sliced1, ...sliced2, "...", numberOfPages.length];
    } else if (currentPage > numberOfPages.length - 3) {
      const sliced = numberOfPages.slice(numberOfPages.length - 4); // slice(10-4)
      tempNumberOfPages = [1, "...", ...sliced];
    }

    setArrOfCurrButtons(tempNumberOfPages);
    setCurrentPage(currentPage);
  }, [pages, currentPage]);

  return (
    <div className={cn()}>
      {arrOfCurrButtons.map((page, index) => {
        return (
          <Page
            key={index}
            disabled={page === "..."}
            className={`${currentPage === page ? "active" : ""}`}
            page={page}
            setCurrentPage={setCurrentPage}
          />
        );
      })}
    </div>
  );
}

Pagination.propTypes = {
  pages: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  setCurrentPage: propTypes.func.isRequired,
};

Pagination.defaultProps = {
  setCurrentPage: () => {},
};

export default React.memo(Pagination);
