export default function parser(arr){
    const finalArr = [{key: '-20', title: 'Все', value: '', dashes: '', id: null}];
  
    for (let i = 0; i < arr.length; i++){//формирование главных категорий товариров
      if(typeof arr[i].parent === 'undefined'){
        finalArr.push({key : arr[i]._key, value: arr[i].name, title: arr[i].title, dashes: '', id:arr[i]._id})
      }
    }
  
    for (let i = 0; i < arr.length; i++){//цикл для подкатегорий
      if (typeof arr[i].parent !== 'undefined'){
        for (let j = 0; j < finalArr.length; j++){
          if(finalArr[j].key === arr[i].parent._key){
            for(let k = 0; finalArr.length - k > j; k++){
              finalArr[finalArr.length - k] = finalArr[finalArr.length - k - 1]
            }
            finalArr[j].dashes === ''
            ? finalArr[j + 1] = {key : arr[i]._key, value: arr[i].name, title: arr[i].title, dashes : '-', id: arr[i]._id}
            : finalArr[j + 1] = {key : arr[i]._key, value: arr[i].name, title: arr[i].title, dashes : finalArr[j].dashes + '-', id: arr[i]._id}
          }
        }
      }
    }
  
    return finalArr.map(item => ({id: item.id, title: item.dashes + item.title, value:item.value, type: 'category'}));
  }