import React from "react";
import propTypes from "prop-types";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";


function AuthVerification({children}) {
  
  const store = useStore();

  useInit(async () => {
    await store.get('authorization').checkToken();
  }, []);

  return (
    <>
      {children}
    </>
  )
}

AuthVerification.propTypes = {
  children: propTypes.node,
}

export default React.memo(AuthVerification);
