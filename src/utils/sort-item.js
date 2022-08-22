export const sortItem = (arr) => {
  let count = 0
  arr.forEach((el, i) => {
    if (!el.parent) {
      //   el.title = ` - ${el.title}`
      //   el.num = el.parent._key + el._key
      // } else {
      el.num = count
      count++
    }
  })
  arr.forEach((el) => {
    if (el.num >= 100 && el.parent) {
      el.title = ` -- ${el.title}`
      el.num = el.parent._key + el.num
    }
  })
  return arr
}
