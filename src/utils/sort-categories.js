export const sortCategories = (array) => {
    let newArr = []
    for (let i = 0; i < array.length; i++) {
        if (array[i].parent) {
            let item = array.find((item) => item._key === array[i].parent._key);
            if (item) {
                newArr.find((item) => item._key === array[i].parent._key).children.push(array[i]);
            }
            newArr.push({...array[i], children: []});
            continue;
        }
        newArr.unshift({...array[i], children: []});
    }


    newArr.forEach((i) => {
        if (!i.parent && i.children.length > 0) {
            i.children.forEach(item => {
                item.title = '-' + item.title;
            })
            return Object.assign(i, {category: i.name});
        }
        const parent = newArr.find((item) => item._key === i.parent._key);
        const amount = parent.title.split('-').length;
        i.title = ("-").repeat(amount) + i.title;
        if (i.children.length > 0) {
            i.children.forEach(item => {
                item.title = ("-").repeat(amount + 1) + item.title;
            })
        }
        return Object.assign(i, {category: parent.category});
    })
    const result = newArr.map((item) => {
        return {title: item.title, value: item._id, category: item.category}
    })

    // lastResult.filter((item) => {
    //     if (!item.parent) {
    //         return item;
    //     }
    //     const parent = newArr.find((i) => i._key === item.parent._key);
    //     parent.children = parent.children.filter(i => {
    //         if (i._key !== item._key) {
    //             return i;
    //         }
    //     })
    //
    //     lastResult.filter((item) => {
    //         if (!item.parent) {
    //             return item;
    //         }
    //     })
    //     parent.children.push(item);
    // })

    result.sort((a, b) => a.title.split('-') < b.title.split('-') && a.category === b.category ? 1 : -1)
    result.unshift({title: 'Все', value: null, category: ''});
    return result;

}

// const getArray = (obj) => {
//     if (obj.children) {
//         const result = obj.children.map(item => {
//             return (getArray(item));
//         })
//         return result;
//     }
//     return obj.children;
// }