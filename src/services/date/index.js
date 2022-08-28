import dateFormat, {i18n} from 'dateformat';
export class DateService {
  constructor(services, config = {}) {
    this.services = services;
    this.config = {
      ...config
    };
  }

  format(dateString, formatString) {

    const options = {
      months: this.services.translate.t('month-names'),
      days: this.services.translate.t('day-names'),
      times: this.services.translate.t('time-names')
    }
    i18n.monthNames = options.months;
    i18n.dayNames = options.days;
    i18n.timeNames = options.times;

    return dateFormat(new Date(dateString), formatString);
  }

}
