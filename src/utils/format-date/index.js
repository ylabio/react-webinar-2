const formatDate = (date) => {
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const optionsHour = {
    hour: 'numeric',
    minute: 'numeric',
  };

  return `${new Date(date)
    .toLocaleString('ru-RU', options)
    .slice(0, -3)} в ${new Date(date).toLocaleString('ru-RU', optionsHour)}`;
};

export default formatDate;
