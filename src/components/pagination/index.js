import React, { useCallback } from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import PaginationItem from "../pagination-item";
import { formPaginationArray } from "../../utils/form-pagination-array";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Pagination(props) {
  const store = useStore();

  const select = useSelector((state) => ({
    current_page: state.catalog.current_page,
    last_page: state.catalog.pages,
  }));

  const pages = formPaginationArray(select.current_page, select.last_page);

  const loadPage = useCallback((page) => store.get("catalog").load(page));

  const content = pages.map((item, index) => (
    <PaginationItem
      key={index}
      current_page={select.current_page}
      loadPage={loadPage}
    >
      {item}
    </PaginationItem>
  ));

  const cn = bem("Pagination");

  return <div className={cn()}>{content}</div>;
}

export default Pagination;
