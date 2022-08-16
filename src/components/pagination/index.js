import React from "react";
import PaginationItem from "../pagination-item";
import { formPaginationArray } from "../../utils/form-pagination-array";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Pagination({ onLoadNewPage, current_page, last_page }) {
  const pages = formPaginationArray(current_page, last_page);

  const content = pages.map((item, index) => (
    <PaginationItem
      key={index}
      current_page={current_page}
      onLoadNewPage={onLoadNewPage}
    >
      {item}
    </PaginationItem>
  ));

  const cn = bem("Pagination");

  return <div className={cn()}>{content}</div>;
}

export default Pagination;
