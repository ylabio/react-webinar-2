import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

/**
 * Хук для редиректа после проверки авторизации
 */
export default function useRedirect(isAuth, logInPage, mainPage){
  const navigate = useNavigate();
  const location = useLocation();

  return useEffect(() => {
    if (!isAuth && location.pathname !== logInPage) {
      navigate(logInPage);
    }
    if (isAuth && location.key === 'default' && location.pathname === logInPage) {
      navigate(mainPage, {replace: true});
    }
    if (isAuth && location.key !== 'default' && location.pathname === logInPage) {
      navigate(-1);
    }
  }, [isAuth])
}
