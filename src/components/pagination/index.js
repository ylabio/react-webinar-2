import React, { useMemo } from "react";
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import "./styles.css";

function Pagination({currentPage, totalPages, onPageChange}) {
  const cn = bem("Pagination");

  const items = useMemo(()=> {
    let delimeterFlag = false;
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || i === currentPage - 1 || i === currentPage || i === currentPage + 1 || (i - 2 === 1 && currentPage === 1) || (i + 2 === totalPages && currentPage === totalPages) ) {
        pages.push(i);
        delimeterFlag = false;
      } else if (!delimeterFlag) {
          pages.push('...');
          delimeterFlag = true;
        }
    };
    return pages;
  }, [currentPage, totalPages])

  return (
    <div className={cn()}>
      <ul className={cn("container")}>
      {items.map((item, i) => <li 
        key={i} 
        className={cn("item", {
          selected: item === currentPage,
          unselected: item !== '...' && item !== currentPage,
          delimeter: item === '...',
        })} 
        onClick={()=> item !== '...' && item !== currentPage && onPageChange(item)}>
          {item}
        </li> )}
      </ul>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: propTypes.number.isRequired,
  totalPages: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired
};

Pagination.defaultProps = {};

export default React.memo(Pagination);
