import {useContext} from "react";
import {ServicesContext} from "../provider";

/**
 * Хук для доступа к менеджеру сервисов
 * @return {Store|{}}
 */
export default function useServices(){
  return useContext(ServicesContext);
}
