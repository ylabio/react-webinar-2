import * as React from "react";
import useSelector from "./use-selector";

const authContext = React.createContext();

function useAuth() {
  const [authed, setAuthed] = React.useState(false);

  const select = useSelector(state => ({
    authorized: state.user.authorized,
  }));

  return {
    authed,
    checkAuthed() {
      setAuthed(select.authorized)
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}
