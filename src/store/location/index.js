import StateModule from "../module";
import qs from 'qs';

const QS_OPTIONS = {
  stringify: {
    addQueryPrefix: true,
    arrayFormat: 'comma',
    encode: false
  },
  parse: {
    ignoreQueryPrefix: true,
    comma: true
  }
}

/**
 * Состояние каталога
 */
class LocationState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      url: document.referrer
    };
  }

}

export default LocationState;
