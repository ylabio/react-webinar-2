import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';


export default function useAuth(deps,path) {
  const nav = useNavigate();
  useEffect(() => {
    if(!deps) nav(`/${path}`)
  }, [deps]);
}