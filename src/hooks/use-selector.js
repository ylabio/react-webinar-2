import {useEffect, useState, useRef} from "react";
import shallowequal from 'shallowequal';
import useStore from "./use-store";

/**
 * Хук для доступа к объекту хранилища
 * @return {Store|{}}
 */
export default function useSelector(selector){

  const store = useStore();

  const [state, setState] = useState(() => selector(store.getState()));

  const unsubscribe = useRef(null);

  // Подписка на Store, если ещё не подписаны
  if (unsubscribe.current === null) {
    unsubscribe.current = store.subscribe(() => {
      // Новая выборка
      const newState = selector(store.getState());
      // Установка выбранных данных, если они изменились
      setState(prevState => {
        // Сравнение с предыдущей выборкой
        return shallowequal(prevState, newState) ? prevState : newState
      });
    });
  }

  useEffect(() => {
    return unsubscribe.current;
  }, []);

  return state;
}
