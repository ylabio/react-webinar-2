import StateModule
 from '../module';
/**
 * Управление лоадером
 */

class LoaderState extends StateModule {

  initState() {
    return {
      isLoading: false,
    }
  }

  /**
   * Показывает лоадер
   */
  viewLoader() {
    this.intervalId = setTimeout(() => {
      this.setState({
        isLoading: true,
      });
    }, 700); 
  }

  /**
   * Скрывает лоадер
   */
  hideLoader() {
    clearTimeout(this.intervalId);
    if (this.getState().isLoading) {
      this.setState({
        isLoading: false,
      })
    }    
  }
}

export default LoaderState;