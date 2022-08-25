
export default function sortingCategory(arr) {
    const nestArr = arr;


    function nestingParent({ _id, parent }) {
        return [_id, ...(parent ? nestingParent(arr.find(el => el._id === parent._id)) : [])];
    }


    arr.forEach(item => {
        const allParent = nestingParent(item);
        const [myId, papaId] = allParent;
        item.title = "- ".repeat(allParent.length - 1) + item.title;
        if (papaId) {
            nestArr.splice((arr.findIndex(el => el._id === papaId)), 0, item)
            nestArr.splice((arr.findLastIndex(el => el._id === myId)), 1)
        }
    });
    nestArr.reverse();
    nestArr.unshift({ _id: '0', _key: '0', name: 'all', title: 'Все', order: 0 });



    return nestArr;
}