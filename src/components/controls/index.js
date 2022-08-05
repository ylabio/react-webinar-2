import React, { useCallback } from "react";
import propTypes from "prop-types";
import "./style.css";

function Controls({ setIsOpenedModal, isMainContent }) {
  const callbacks = {
    onClick: useCallback(() => {
      setIsOpenedModal(true);
    }, [setIsOpenedModal]),
    onClose: useCallback(() => {
      setIsOpenedModal(false);
    }, [setIsOpenedModal]),
  };
  return (
    <div className="Controls">
      {isMainContent ? (
        <button onClick={callbacks.onClick}>Перейти</button>
      ) : (
        <button onClick={callbacks.onClose}>Закрыть</button>
      )}
    </div>
  );
}

Controls.propTypes = {
  isMainContent: propTypes.any,
  setIsOpenedModal: propTypes.func.isRequired,
};

Controls.defaultProps = {
  setIsOpenedModal: () => {},
};

export default React.memo(Controls);
