import useSelector from "./use-selector";
import useStore from "./use-store";

/**
 * Хук для использования языков
 * @return {(string) => string}
 */
export default function useLanguage() {

  const store = useStore();
  const funcRef = word => store.get('localization').getLocalizedTextFor(word);
  
  useSelector(state => state.localization.lang); // только для проверки и перерисовки

  return funcRef;
}
