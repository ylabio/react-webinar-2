/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export default function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}


export function categories(arr = []) {

    const firstCategory = []
    const secondCategory = []
    const thirdCategory = []

    for(let i = 0; i < arr.length; i++) {
      if(!arr[i]?.parent?._id) {
        firstCategory.push(arr[i])
      } 
    }

    for (let i = 0; i < arr.length; i++) {
      firstCategory.map(item => {
        if(item?._id === arr[i]?.parent?._id) {
          const elem = {...arr[i], title: `- ${arr[i].title}`}
          secondCategory.push(elem) 
        }
      })
    }

    for (let i = 0; i < arr.length; i++) {
      secondCategory.map(item => {
        if(item?._id === arr[i]?.parent?._id) {
          const elem = {...arr[i], title: `- - ${arr[i].title}`, order: 2}
          thirdCategory.push(elem) 
        }
      })
    }

    for (let i = 0; i < arr.length; i++) {
      thirdCategory.map(item => {
        if(item?._id === arr[i]?.parent?._id) {
          const elem = {...arr[i], title: `- - ${arr[i].title}`, order: 2}
          thirdCategory.push(elem) 
        }
      })
    }

    const mainarr = [...firstCategory, ...secondCategory, ...thirdCategory]
    const sortedAtt = mainarr.sort((a,b) => a.order - b.order)
    sortedAtt.unshift({
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
    return sortedAtt
      
}
