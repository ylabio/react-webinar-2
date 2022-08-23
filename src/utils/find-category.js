export function findCategoryByTitle(categories, categoryTitle){
    const category = categories.find(el => el.title === categoryTitle)
    if (category){
        return category._id
    }
    return ''
}

export function findCategoryById(categories, categoryId){
    const category = categories.find(el => el._id === categoryId)
    if (category){
        return category.title
    }
    return ''
}