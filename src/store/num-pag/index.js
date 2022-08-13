import StateModule from "../module";

/**
 * Смена страницы
 */
class PagState extends StateModule {
  initState() {
    return {
      num: 0,
    };
  }

  newPage(n) {
    this.setState(
      { num: n },

      `Новая страница`
    );
  }
}

export default PagState;
