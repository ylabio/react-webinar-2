import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Pagination({ allPage, pag, setPag }) {
  const cn = bem("Pagination");

  const array = Array.from([...new Array(allPage)].keys());
  return (
    <ul className={cn()}>
      {array.map((item) => {
        if (
          (item >= pag - 1 && item <= pag + 1) ||
          item === 0 ||
          item === array.length - 1
        ) {
          return (
            <li key={item}>
              {item === array.length - 1 && pag < array.length - 3 && (
                <span>&ensp;...&ensp;</span>
              )}
              <button
                className={cn(pag === item ? "active" : "none")}
                onClick={() => setPag(item)}
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
