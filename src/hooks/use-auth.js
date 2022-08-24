import { useEffect, useCallback } from "react";
import useSelector from "./use-selector";
import useStore from "./use-store";

export default function useAuth()  {
    const store = useStore();
    const reset = useCallback(() => store.get('user').resetError());
    let user = useSelector((state) => state.user);
    let token = localStorage.getItem("token");
    useEffect(() => {
      if(token && !user.logined) {
        store.get('user').auth(token).then((res) => store.get('profile').setProfile(res.result.profile));
      }
      return () => reset();
    }, [token])
}