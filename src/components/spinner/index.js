import React from "react";
import "./style.css";

function Spinner(props) {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
}

export default React.memo(Spinner);
