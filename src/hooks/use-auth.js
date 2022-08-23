import React, { useEffect } from "react";
import useSelector from "./use-selector";
import useStore from "./use-store";

function useAuth() {
  const store = useStore();
  const {isChecked, token} = useSelector(state => state.auth);

  useEffect(() => {
    store.get('auth').checkUser();

   if (token) {
    store.get('auth').getProfile(token);
   }
  }, [isChecked])

  return [isChecked];
}

export default useAuth;