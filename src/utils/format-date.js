export default function formatDate(value, t) {
  const loc = t('date.loc');

  let dateFormat = new Intl.DateTimeFormat(loc, {
    year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'
  }).format(Date.parse(value));

  if (loc == 'ru-RU')
    return dateFormat.replace('г.,', 'в');

  return dateFormat;
}