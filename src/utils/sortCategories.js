
function sycle(arr) {
    const firstLevel = []
    const secondLevel = []
    const thirdLevel = []
    const forthLevel = []

    for(let i = 0; i < arr.length; i++) {
        if(!arr[i]?.parent) {
          firstLevel.push(arr[i])
        } 
    }
    for(let i = 0; i < arr.length; i++) {
      firstLevel.map(item => {
        if(arr[i]?.parent?._id === item?._id ) {
          secondLevel.push({...arr[i], title: ` - ${arr[i].title}`})
        } 
    })

    }

    for(let i = 0; i < arr.length; i++) {
      secondLevel.map(item => {
        if(arr[i]?.parent?._id === item?._id) {
          thirdLevel.push({...arr[i], title: `- - ${arr[i].title}`, order: item.order})
        } 
    })
  }
    for(let i = 0; i < arr.length; i++) {
      thirdLevel.map(item => {
        if(arr[i]?.parent?._id === item?._id) {
          forthLevel.push({...arr[i], title: `- - - ${arr[i].title}`, order: item.order})
        } 
    })

    }
    return [...firstLevel, ...secondLevel, ...thirdLevel, ...forthLevel]

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
