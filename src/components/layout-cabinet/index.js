import React from "react";

function Cabinet({ children, head }) {
  return (
    <div>
      {head}
      {children}
    </div>
  );
}

export default React.memo(Cabinet);
