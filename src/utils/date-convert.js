export const dateConvert = (date) => {

    const month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

    const dataYear = date.slice(0, 4);
    const dataMonth = month[date.slice(5, 7) - 1];
    const dataDay = date.slice(8, 10);
    const time = date.slice(-13, -8)

    return `${dataDay} ${dataMonth} ${dataYear} в ${time}`
};