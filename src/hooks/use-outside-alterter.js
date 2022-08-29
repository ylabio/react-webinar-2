import React, {useRef, useEffect} from 'react';

/**
 * Выполняет callback в случае кликов за границами обозанченными элементом с ref
 */
function useOutsideAlerter(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      // если элемент который необходимо закрыть монтирован и событие произошло вне его.
      if (ref.current && !ref.current.contains(event.target)) {
        callback(event.target);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      // Очищаем после размонтирования элемента
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref]);
}

export default function OutsideAlerter(props) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, props.callback);

  return <div ref={wrapperRef}>{props.children}</div>;
}
