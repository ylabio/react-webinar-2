import StateModule from '../module';

/**
 * Состояние товара
 */
class ErrorState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      error: null,
    };
  }

  setError(error) {
    this.setState({
      error,
    });
  }

  deleteError() {
    this.setState({
      error: null,
    });
  }
}

export default ErrorState;
