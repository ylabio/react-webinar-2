import StateModule from "../module";

/**
 * Управление модальными окнами
 */
class ParamsState extends StateModule {

    initState() {
        return {
            isLoaded: false
        };
    }

    setIsLoaded(bool) {
        this.setState({
            ...this.getState,
            isLoaded: bool
        }, 'переключение isLoaded странцы');
    }

}

export default ParamsState;
