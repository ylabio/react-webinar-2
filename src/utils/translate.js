import useSelector from "./use-selector";

/**
   * Отбирает текст по коду (ru/eng/...) из передаваемого элемента совпадающий с языком страницы
   * @param choices {Object} @example {{elementPart: { ru: "rus word", eng: "word" }}}
   * @return {Object}
   */
export const translate = (elem) => {
    const lang = useSelector(state => state.params.lang);

    let text = {};

    Object.keys(elem).forEach((elPart) => {
        if (elem[elPart][lang]) text[elPart] = elem[elPart][lang];
    })

    return text;
};
