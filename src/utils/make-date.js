export function makeDate(date) {
  const day = new Date(date).toLocaleString('ru', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const time = new Date(date).toLocaleString('ru', {
    hour: 'numeric',
    minute: 'numeric',
  });

  const result = `${day} в ${time}`.replace('г.', '');

  return result;
}
