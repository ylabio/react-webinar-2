export const createList = (items) => {
  let arr = []

  const recursion = (items) => {
    items.forEach((item) => {
      const category = {
        title: `${'- '.repeat(item.level)}${item.title}`,
        value: item._id,
      }
      arr.push(category)
      if (item?.children?.length) {
        recursion(item.children)
      } else return
    })
  }
  recursion(items)

  return arr
}
