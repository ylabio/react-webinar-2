
function sycle(arr) {
    const newArr = []
  
    for(let i = 0; i < arr.length; i++) {
        if(!arr[i]?.parent) {
          newArr.push(arr[i])
        } 
    }
    for(let i = 0; i < arr.length; i++) {
    arr.map(item => {
        if(arr[i]?.parent?._id === item?._id && !item?.parent) {
        newArr.push({...arr[i], title: ` - ${arr[i].title}`})
        } 
        if(arr[i]?.parent?._id === item?._id && item?.parent) {

        newArr.push({...arr[i], title: ` - - ${arr[i].title}`, order: arr[i].order = item.order})
        }
    })

    }
    return [...newArr]
}
  
  export function categoriesArr(arr = []) {
  
    let sortedArr = sycle(arr)
  
    sortedArr.unshift({
        dateCreate: "",
        dateUpdate: "",
        description: "",
        isDeleted: false,
        isNew: true,
        name: "",
        order: 1,
        proto: {},
        title: "Все",
        _id: "",
        _key: "1",
        _type: "category"})
    
    return sortedArr.sort((a, b) => a.order - b.order)
      
  }
  