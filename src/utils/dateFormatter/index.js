import df, {i18n} from 'dateformat';

const defaultMonthNames = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
];

const defaultDayNames = [
  'Пн',
  'Вт',
  'Ср',
  'Чт',
  'Пт',
  'Сб',
  'Вс',
  'Пн',
  'Вт',
  'Ср',
  'Чт',
  'Пт',
  'Сб',
  'Вс'
];

const defaultTimeNames = ['a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'];
/**
 *
 * @param {string} date
 * @param {string} formatString
 * @param {Array[string]} monthNames
 */
export default function dateFormat(
  date,
  formatString,
  options = {
    monthNames: defaultMonthNames,
    dayNames: defaultDayNames,
    timeNames: defaultTimeNames
  }
) {
  i18n.monthNames = options.monthNames;
  i18n.dayNames = options.dayNames;
  i18n.timeNames = options.timeNames;
  const _date = new Date(date);
  return df(_date, formatString);
}
