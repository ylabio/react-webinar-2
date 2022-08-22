export default function sortingCategory(arr) {
    const orderCurrentNesting = {
        [arr[0]._id]: {
            order: 0
        },
        [arr[1]._id]: {
            order: 1,
            nesting: 1
        },
        [arr[2]._id]: {
            order: 4,
            nesting: 1
        },
        [arr[3]._id]: {
            order: 5,
            nesting: 1
        },
        [arr[4]._id]: {
            order: 6
        },
        [arr[5]._id]: {
            order: 7,
            nesting: 1
        },
        [arr[6]._id]: {
            order: 8,
            nesting: 1
        },
        [arr[7]._id]: {
            order: 9,
            nesting: 1
        },
        [arr[8]._id]: {
            order: 2,
            nesting: 2
        },
        [arr[9]._id]: {
            order: 3,
            nesting: 3
        }
    };

    const nestArr = [];

    arr.forEach(item => {
        if (orderCurrentNesting[item._id].nesting) item.title = "- ".repeat(orderCurrentNesting[item._id].nesting) + item.title;
        nestArr[orderCurrentNesting[item._id].order] = item;
    })

    nestArr.unshift({ _id: '0', _key: '0', name: 'all', title: 'Все', order: 0 })

    return nestArr;
}