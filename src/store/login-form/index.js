import StateModule from '../module';

/**
 * Состояние товара
 */
class LoginFormState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      login: {
        value: '',
        isEmptyError: false,
      },
      password: {
        value: '',
        isEmptyError: false,
      },
    };
  }

  /**
   * Изменить логин
   * @param {"login"|"password"} inputType тип инпута
   * @param {string} newValue новое значение инпута
   */
  changeInput(inputType, newValue) {
    this.setState({
      ...this.getState(),
      [inputType]: { ...this.getState()[inputType], value: newValue },
    });
  }

  /**
   * Меняем ошибку (пустой инпут)
   * @param {"login"|"password"} inputType тип инпута
   * @param {boolean} isEmptyError
   */
  changeIsEmptyError(inputType, isEmptyError) {
    this.setState({
      ...this.getState(),
      [inputType]: { ...this.getState()[inputType], isEmptyError },
    });
  }

  /**
   * Очищаем инпуты
   */
  clearInputs() {
    this.setState({
      ...this.getState(),
      login: { ...this.getState().login, value: '' },
      password: { ...this.getState().password, value: '' },
    });
  }
}

export default LoginFormState;
