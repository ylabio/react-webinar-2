let result = []

export default function sortCategory(CategoryTree, count, array) {
  result = [...array]
  count += 1
  for (let i = 0; i < CategoryTree.length; i++) {
    if (CategoryTree[i]['children']) {
      result.push({
        title: `${"-".repeat(count)}${CategoryTree[i]["title"]}`,
        value: CategoryTree[i]["_id"]
      })
      sortCategory(CategoryTree[i]['children'], count, result)
    }
    else {
      result.push({
        title: `${"-".repeat(count)}${CategoryTree[i]["title"]}`,
        value: CategoryTree[i]["_id"]
      })
    }
  }
  return result
}

