export default function makeSearchStr(obj, options = {}) {
  let str = '';
  let prev = '';
  Object.keys(obj).forEach(key => {
    if (options.exclude?.includes(key)) return;
    str += prev + key + `=${obj[key]}`;
    prev = '&';
  })
  return str;
}
