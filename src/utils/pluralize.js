export default function pluralize(count) {
  const plural = require('plural-ru');
  return plural(count, 'раз', 'раза', 'раз')
}