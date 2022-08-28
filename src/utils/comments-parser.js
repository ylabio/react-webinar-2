

export default function parser(arr, paramId){
  const finalArr = []

  if(typeof arr === 'undefined') return

  for (let i = 0; i < arr.length; i++){//формирование главных категорий товариров
    if(typeof arr[i].parent._id === 'undefined' || arr[i].parent._id == paramId){
      finalArr.push({id : arr[i]._id, level: 0, content: {...arr[i]}, active: false})
    }
  }

  for (let i = 0; i < arr.length; i++){//цикл для подкатегорий
    if (typeof arr[i].parent._id !== 'undefined'){
      for (let j = 0; j < finalArr.length; j++){
        if(finalArr[j].id === arr[i].parent._id){
          for(let k = 0; finalArr.length - k > j; k++){
            finalArr[finalArr.length - k] = finalArr[finalArr.length - k - 1]
          }
          finalArr[j].level === 0
          ? finalArr[j + 1] = {id : arr[i]._id, content: {...arr[i]}, level : 1, active: false}
          : finalArr[j + 1] = {id : arr[i]._id, content: {...arr[i]}, level : + finalArr[j].level + 1, active: false}
        }
      }
    }
  }

  return finalArr.map(item => ({id: item.id, level: item.level, content: item.content, active: item.active}));
}