import {useEffect, useState} from "react";
import shallowequal from 'shallowequal';
import useStore from "./use-store";

/**
 * Хук для доступа к объекту хранилища
 * @return {Store|{}}
 */
export default function useSelector(selector){

  const store = useStore();

  const [state, setState] = useState(() => selector(store.getState()));

  useEffect(() => {
    // Подписка на последующие изменения в store
    return store.subscribe(() => {  //то что после return сработает сразу и каждый раз, а тот UnSub чтовернется от store.sub ток 1 раз в конце (подобно той хуйне когда в <button onClick={onClick() делаешь вместо onClick или () => onClick() и он срабатывает мгновенно} />)
      // Новая выборка
      const newState = selector(store.getState());
      // Установка выбранных данных, если они изменились
      setState(prevState => {
        // Сравнение с предыдущей выборкой
        return shallowequal(prevState, newState) ? prevState : newState
      });
    });
  }, []);

  return state;
}
