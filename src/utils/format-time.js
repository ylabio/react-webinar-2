export function formatTime(timestamp) {
  const date = new Date(timestamp).toLocaleString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).slice(0, -3);

  const time = new Date(timestamp).toLocaleString('ru-RU', {
    hour: 'numeric',
    minute: 'numeric'
  });

  return date + ' в ' + time;
}