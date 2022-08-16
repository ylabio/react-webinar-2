import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function PaginationItem({ children, current_page, onLoadNewPage }) {
  const clickPage = (event) => {
    event.preventDefault();
    onLoadNewPage(children);
  };

  const cn = bem("PaginationItem");

  const isActive = current_page === parseInt(children);
  const isDots = children === "...";

  return (
    <div className={cn({ active: isActive, dots: isDots })}>
      <a href="#" onClick={clickPage}>
        {children}
      </a>
    </div>
  );
}

export default PaginationItem;
