import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

/**
 * Хук для редиректа после проверки авторизации
 */
export default function useRedirect(isAuth, isNotAuthPage, mainPage){
  const navigate = useNavigate();
  const location = useLocation();

  return useEffect(() => {
    if (!isAuth && location.pathname !== isNotAuthPage) {
      navigate(isNotAuthPage);
    }
    if (isAuth && location.key === 'default' && location.pathname === isNotAuthPage) {
      navigate(mainPage, {replace: true});
    }
    if (isAuth && location.key !== 'default' && location.pathname === isNotAuthPage) {
      navigate(-1);
    }
  }, [isAuth])
}
