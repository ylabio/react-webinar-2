import moment from "moment";

export default function dateFormatter(date, lang = "ru") {
  let newDate = new Date(date);
  let dateFormat;
  moment.locale(lang);

  let timeFormat = moment(newDate).format("LT");
  if (lang == "ru") {
    dateFormat = moment(newDate).format("LL").replace("г.", "в");
  } else {
    dateFormat = moment(newDate).format("LL").replace("г.", "at");
  }

  let result = `${dateFormat} ${timeFormat}`;
  return result;
}
