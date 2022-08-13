import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Pagination({ allPage, pag, newPage }) {
  const cn = bem("Pagination");

  const array = Array.from([...new Array(allPage)].keys());
  return (
    <ul className={cn()}>
      {array.map((item) => {
        let start = pag === 0 ? 2 : 1;
        let end = pag === array.length - 1 ? 2 : 1;

        if (
          (item >= pag - end && item <= pag + start) ||
          item === 0 ||
          item === array.length - 1
        ) {
          return (
            <li key={item} className={cn("pages")}>
              {item === array.length - 1 && pag < array.length - 3 && (
                <span>&ensp;...&ensp;</span>
              )}
              <button
                className={cn(pag === item ? "active" : "none")}
                onClick={() => newPage(item)}
              >
                {item + 1}
              </button>
              {item === 0 && pag > 2 && <span>&ensp;...&ensp;</span>}
            </li>
          );
        }
      })}
    </ul>
  );
}

export default React.memo(Pagination);
