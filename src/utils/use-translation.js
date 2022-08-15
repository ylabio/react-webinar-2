import useSelector from "../utils/use-selector";

/**
 * Хук для доступа к объектам translation
 * @return {translation|{}}
 */
export default function useTranslation(){

    const locale = useSelector(state => state.app.locale);

    return require(`../locales/${locale}.json`)
}
// можно разбить все перевода на json файлы каждой отдельной страницы (путь - папка локализации и назвинме - передавать через пропсы)
