export default function convertData(data, lang) {
  const dateFormat = new Date(data);
  const newDate = dateFormat.toLocaleString(lang,
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).replace('г.,', 'в');
  return newDate
}