export const formatDate = (oldDate, lang) => {
  const date = new Date(oldDate);

  if(lang === 'ru')
    return date.toLocaleString(lang,
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      }).replace('г.,', 'в');
  if(lang === 'en')
    return date.toLocaleString(lang,
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      });
}

