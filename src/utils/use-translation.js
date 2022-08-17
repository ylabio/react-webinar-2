import useSelector from "../utils/use-selector";

/**
 * Хук для доступа к объектам translation
 * @return {translation|{}}
 */
export default function useTranslation(chapter){

    const locale = useSelector(state => state.app.locale);
    const wordbook = require(`../locales/${locale}.json`)

    return (key) => wordbook[chapter][key]
}
// можно разбить все перевода на json файлы каждой отдельной страницы (путь - папка локализации и назвинме - передавать через пропсы)
