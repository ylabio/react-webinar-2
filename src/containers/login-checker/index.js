import React from "react";
import {Navigate} from "react-router-dom";

function LoginChecker({children, condition, path}) {
  if(condition) {
    return (
      <>
        {children}
      </>
    )
  } else {
    return (
      <div>
        <Navigate to={path}/>
      </div>
    )
  }
}

export default React.memo(LoginChecker);
