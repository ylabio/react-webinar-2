import React, { useEffect, useState } from "react";
import { getUserDataFromLS } from "../utils";
import useStore from "./use-store";

function useAuth() {
  const store = useStore();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const userData = getUserDataFromLS();
    if (userData) {
      store.get('auth').getProfile(userData.token);
    }
    
    setIsChecked(true);
  }, [])

  return [isChecked];
}

export default useAuth;