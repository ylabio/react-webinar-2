const getDate = (str) => {
  const d = new Date(Date.parse(str));
  let monthNumber = d.getMonth();
  let month;

  switch (monthNumber) {
    case 0:
      month = 'января';
      break;
    case 1:
      month = 'февраля';
      break;
    case 2:
      month = 'марта';
      break;
    case 3:
      month = 'апреля';
      break;
    case 4:
      month = 'мая';
      break;
    case 5:
      month = 'июня';
      break;
    case 6:
      month = 'июля';
      break;
    case 7:
      month = 'августа';
      break;
    case 8:
      month = 'сентября';
      break;
    case 9:
      month = 'октября';
      break;
    case 10:
      month = 'ноября';
      break;
    case 11:
      month = 'декабря';
      break;
  }

  return d.getDate() + ` ${month} ` + d.getFullYear() + ' в ' +
    d.getHours().toString().padStart(2, 0) + ':' +
    d.getMinutes().toString().padStart(2, 0);
};

export {getDate};