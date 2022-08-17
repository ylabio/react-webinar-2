import StateModule from '../module';

class LanguageState extends StateModule {
  initState() {
    return {
      lang: 'ru',
    };
  }

  changeLang(newLang) {
    this.setState({ lang: newLang });
  }
}

export default LanguageState;
