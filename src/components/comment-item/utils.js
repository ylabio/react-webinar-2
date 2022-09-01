const getDate = (str) => {
  const d = new Date(Date.parse(str));
  let m = d.getMonth();

  m = (m === 0) ? 'января' : (m === 1) ? 'февраля' : (m === 2) ? 'марта'
    : (m === 3) ? 'апреля' : (m === 4) ? 'мая' : (m === 5) ? 'июня'
    : (m === 6) ? 'июля' : (m === 7) ? 'августа' : (m === 8) ? 'сентября'
    : (m === 9) ? 'октября' : (m === 10) ? 'ноября' : 'декабря';

  return d.getDate() + ` ${m} ` + d.getFullYear() + ' в ' +
    d.getHours().toString().padStart(2, 0) + ':' +
    d.getMinutes().toString().padStart(2, 0);
};

export { getDate };