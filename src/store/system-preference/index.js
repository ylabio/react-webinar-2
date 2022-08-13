import StateModule from "../module";

class SystemPreferenceState extends StateModule {

  initState() {
    return {
      language: 'ru',
    };
  }

  setLanguage(str) {
    this.setState({...this.getState(), language: str})
  }
}

export default SystemPreferenceState;
