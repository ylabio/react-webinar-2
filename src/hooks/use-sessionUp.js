import useStore from "../hooks/use-store";
import useSelector from "../hooks/use-selector";

/**
 * Хук восстанавливает сессию
 */

export default function useSessionUp() {

  const select = useSelector(state => ({
    tokenStore: state.authorization.token
  }));  

  const store = useStore();  
  //1.проверка авторизации
  let token = '';
  if (select.tokenStore)
    token = select.tokenStore;
  //2.проверяем токен в куки, если куки включены
  let tokenCookie = '';
  if (navigator.cookieEnabled) {
    tokenCookie = document.cookie.match(/token=(.+?)(;|$)/);
  }  
  //3.авторизуемся по токену, если  в 
  //tokenStore пуст и токен в куки существует
  //если будет плохой токен, автоматическая авторизация не пройдет
  //store.get('authorization') выдаст в консоль "Плохой токен"
  if(token === '' && tokenCookie) {
    store.get('authorization').reLogin(tokenCookie[1]);
    store.get('userinfo').setUserInfo(tokenCookie[1]);
  }  
}    