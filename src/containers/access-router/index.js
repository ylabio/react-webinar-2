import React from "react";

function AccessRouter({children, trigger, route}) {

  return (
    <>
      {trigger && children}
      {!trigger && route}
    </>
  );
}

export default React.memo(AccessRouter);
