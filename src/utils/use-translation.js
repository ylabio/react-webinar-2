import useSelector from "../utils/use-selector";

/**
 * Хук для доступа к функциям translation
 * @return {translation|{}}
 */
export default function useTranslation(chapter){

    const locale = useSelector(state => state.app.locale);
    const wordbook = require(`../locales/${locale}.json`)

    return (key) => wordbook[chapter][key]
}
