import {StoreContext} from "../store/context";
import {useContext} from "react";

/**
 * Хук для доступа к объекту хранилища
 * @return {Store|{}}
 */
export default function useStore(){
  return useContext(StoreContext);
}
