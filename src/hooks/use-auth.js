import useSelector from "./use-selector";
import useStore from "./use-store";

export default function useAuth(){
  const store = useStore();
  const {token} = useSelector(state=>state.user);
  
  if (!token) store.get('user').getUser(localStorage.getItem('token'));
  return {
    isAuth: !!token
  }
}