import { useEffect } from 'react';

/**
 * Хук для асинхронных расчётов, которые будут исполнены при первом рендере или изменении depends.
 * @param callback {Function} Пользовательская функция
 * @param depends {Array} Значения при смене которых callback снова исполнится.
 * @param options {{backForward}}
 */
export default function useInit(callback, depends = [], options = {backForward: false}) {
    useEffect(() => {
      callback(false);
      // Если в истории браузера меняются только search-параметры, то react-router не оповестит
      // компонент об изменениях, поэтому хук можно явно подписать на событие изменения истории
      // браузера (если нужно отреагировать на изменения search-параметров при переходе по истории)
      if (options.backForward) {
        window.addEventListener('popstate', callback);
        return () => {
          window.removeEventListener('popstate', callback);
        };
      }
    }, depends);
}
