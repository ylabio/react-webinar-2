import StateModule from "../module";
class LanguagesHOC extends StateModule{

  initState() {
    return {
      languages: "ru"
    };
  }

  changeLang(lang){
    this.setState({
      languages: lang
    }, `Изменение языка`);
  }
}
  
export default LanguagesHOC;