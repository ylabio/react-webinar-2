import StateModule from "../module";

class ErrorState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      err: []
    };
  }

  removeErr() {
    this.setState({
      err: []
    })
  }
}

export default ErrorState;
