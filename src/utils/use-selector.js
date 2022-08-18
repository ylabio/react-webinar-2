import {useEffect, useState} from "react";
import shallowequal from 'shallowequal';
import useStore from "./use-store";

/**
 * Хук для доступа к объекту хранилища
 * @return {Store|{}}
 */
export default function useSelector(selector){

  const store = useStore();//достает store

  const [state, setState] = useState(() => selector(store.getState()));//в состояние хука кладет текущее состояние store

  useEffect(() => {
    // Подписка на последующие изменения в store
    return store.subscribe(() => {
      // Новая выборка
      const newState = selector(store.getState());
      // Установка выбранных данных, если они изменились
      setState(prevState => {
        // Сравнение с предыдущей выборкой
        return shallowequal(prevState, newState) ? prevState : newState
      });
    });
  }, []);//вызывается 1 при вызове хука

  return state;
}
