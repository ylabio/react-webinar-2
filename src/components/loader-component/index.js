import React from "react";
import "./style.css";

function LoaderComponent() {
  return (
    <div className="Loader-wrapper">
      <div className="Loader"></div>
    </div>
  );
}

export default React.memo(LoaderComponent);
