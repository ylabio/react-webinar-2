import React from "react";
import { createContext } from "react";

export const AppContext = createContext(null);

function AppContextProvider({store, children}) {
  return <AppContext.Provider value={{store}}>
    {children}
  </AppContext.Provider>
}

export default AppContextProvider;