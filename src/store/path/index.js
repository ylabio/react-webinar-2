import StateModule from "../module";

/**
 * Состояние стартовой страницы
 */
class PathState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      previous: false,
      redirect: false,
    };
  }

  setPreviousPath(previous, redirect = false) {
    this.setState({
      previous,
      redirect,
    });
  }
}

export default PathState;
