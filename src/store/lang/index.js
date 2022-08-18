import StateModule from "../module";

class LangState extends StateModule {
  initState() {
    return {
      lang: 'ru'
    }
  }

  changeLang(lang) {
    this.setState({
      lang
    }, 'Изменение языка на ' + lang)
  }
}

export default LangState