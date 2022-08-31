const convertToRuDate = (str) => {
  const options = {day: 'numeric', month: 'long', hour: 'numeric',  minute: 'numeric'};
  const date = new Intl.DateTimeFormat('ru', options).format(new Date(str))
  const arr = date.split(',');
  const year = new Date().getFullYear();
  return `${arr[0]} ${year} в${arr[1]}`
}

export default convertToRuDate;
