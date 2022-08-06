import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

function Modal({ setModal, buyState, setBuyState }) {
  const cn = bem("Modal");

  return (
    <div className={cn()}>
      {buyState.length
        ? buyState.map((item, index) => (
            <div key={index} className={cn("item")}>
              <div className={cn("number")}>{index}</div>
              <div className={cn("title")}>{item.title}</div>

              <div className={cn("actions")}>
                <button
                  onClick={() => setBuyState((state) => [...state, item])}
                >
                  Добавить
                </button>
              </div>
            </div>
          ))
        : "..."}
    </div>
  );
}

Modal.propTypes = {
  setModal: propTypes.func,
  setBuyState: propTypes.func,
  buyState: propTypes.array,
};

Modal.defaultProps = {
  setModal: () => {},
  setBuyState: () => {},
  buyState: [],
};

export default React.memo(Modal);
