import StateModule from "../module";

/**
 * состояние формы
 */
class LoginForm extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      error: {}
    };
  }

  /**
   * Авторизация
   */
  loginForm(error){
    this.setState({
      error: error
    }, 'Установка состояния формы');      
  }
}  
export default LoginForm;
