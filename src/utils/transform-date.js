const options = { year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric" };

export function transformDate(dateCreate, locale) {
  const date = new Date(dateCreate);
  const transformDate = date.toLocaleString(locale, options).replace(/г.,/gi, 'в');
  return transformDate;
}