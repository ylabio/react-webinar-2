import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import useSelector from "./use-selector";


export default function useAuth(deps,path) {
  const nav = useNavigate();
  // const token = useSelector(state => state.auth.token)
  useEffect(() => {
    if(!deps) nav(`${path}`)
  }, [deps]);
}