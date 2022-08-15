import React from "react";

function TitleNotfFound() {
  return (
    <div className="NotfFound-wrapper">
      <h2 className="NotfFound-title">
        <span>404</span>
        <span>Page not found</span>
      </h2>
    </div>
  )
}

export default React.memo(TitleNotfFound);
