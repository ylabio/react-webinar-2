import StateModule from "../module";

class Categories extends StateModule{
    initState() {
        return {
            categories: []
        };
    }

    async getAllCategories(){
        // Решение из интернета
        const res = await fetch('/api/v1/categories')
        const json = await res.json()
        const newArr = json.result.items.map(c => ({
            _id: c._id,
            title: c.title,
            parent: c.parent?._id
        }))
        for (let item of newArr) {
            if (!item.parent) continue

            let parentId = item.parent
            do {
                const temp = newArr.find(item => item._id === parentId)
                item.title = '- ' + item.title
                parentId = temp.parent
            } while (parentId)
        }

        newArr.forEach((category, index) => {
            if (category.parent) {
                newArr.splice(newArr.findIndex(el => el._id === category.parent) + 1, 0, category)
                newArr.splice(index + 1, 1)
            }
        })

        newArr[0] = {_id: '', title: 'Все', parent: ''}

        this.setState({
            ...this.getState(),
            categories: newArr
        })
    }


}

export default Categories