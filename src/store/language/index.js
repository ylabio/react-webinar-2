import StateModule from "../module";

/**
 * Управление модальными окнами
 */
class LanguageState extends StateModule {
  initState() {
    return {
      num: 0,
    };
  }
  //   changeLanguage() {
  //     this.setState(
  //       (n) => {
  //         n: n.num === 0 ? 1 : 0;
  //       },

  //       `Смена языка`
  //     );
  //   }

  changeLanguage() {
    this.setState(
      { num: this.store.state.language.num === 0 ? 1 : 0 },
      `Смена языка`
    );
  }
}

export default LanguageState;
