import useServices from "./use-services";

/**
 * Хук для доступа к объекту хранилища
 * @return {Store|{}}
 */
export default function useStore(){
  return useServices().store;
}
