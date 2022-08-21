export const categoryTree = (categories) => {
    const arr = [];
    let count = 0;

    categories.map((item) => {
        if(!item.parent) {
            arr.splice(count, 0, item);
            arr[count].group = count + 1;
            count++;
        }
    })
    count = 0;
    const groupCat = () => {
        let arrows = '';
        count++;
        for (let i = 1; i <= count; i++) {
            arrows = arrows + '- ';
        }
        categories.map((category) => {
            arr.map((item, index) => {
                if(item.group === count && category.parent?._key === item._key) {
                    arr.splice(index + 1, 0, category);
                    arr[index + 1].group = count + 1;
                    arr[index + 1].title = arrows + arr[index + 1].title;
                }
            })
        })

        if (categories.length !== arr.length) {
            groupCat.apply(this);
        }
    }

    groupCat();

    return arr;
}