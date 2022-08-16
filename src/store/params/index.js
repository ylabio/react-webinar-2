import StateModule from "../module";

class ParamsState extends StateModule {

    initState() {
        return {
            isLoaded: false,
            lang: localStorage.getItem("lang") || "ru"
        };
    }

    /**
   * Установка значения загрузилась ли страница
   * @param bool {Boolean}
   */
    setIsLoaded(bool) {
        this.setState({
            ...this.getState(),
            isLoaded: bool
        }, 'переключение isLoaded странцы');
    }

    /**
   * Установка языка страницы
   * @param lang {String}
   */
    setLang(lang) {
        lang = lang.toLowerCase();
        localStorage.setItem("lang", lang);
        this.setState({
            ...this.getState(),
            lang
        }, 'переключение языка страницы')
    }
}

export default ParamsState;
