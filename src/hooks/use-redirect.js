import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

/**
 * Хук для редиректа после проверки авторизации
 */
export default function useRedirect(isAuth, logInPage, mainPage, complete){
  const navigate = useNavigate();
  const location = useLocation();

  return useEffect(() => {
    if (!isAuth && location.pathname !== logInPage && complete) {
      navigate(logInPage);
    }
    if (isAuth && location.key === 'default' && location.pathname === logInPage && complete) {
      navigate(mainPage, {replace: true});
    }
    if (isAuth && location.key !== 'default' && location.pathname === logInPage && complete) {
      navigate(-1);
    }
  }, [isAuth, complete])
}
