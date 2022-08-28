/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export default function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}


export const timeFixion = (data) => {

  const date = data.split('T')[0]
  const day = date.split('-')[2]
  const mounth = date.split('-')[1]
  const year = date.split('-')[0]


  const time = data.split('T')[1]
  const hour = time.split(':')[0]
  const minute = time.split(':')[1]
   return `${day} ${mounthCreator(mounth)} ${year} в ${+hour + 3}:${minute}`
}
const mounthCreator = (num) => {
  if(num == '01') return 'января'
  if(num == '02') return 'февраля'
  if(num == '03') return 'мартра'
  if(num == '04') return 'апреля'
  if(num == '05') return 'мая'
  if(num == '06') return 'июня'
  if(num == '07') return 'июля'
  if(num == '08') return 'августа'
  if(num == '09') return 'сентября'
  if(num == '10') return 'октября'
  if(num == '11') return 'ноября'
  if(num == '12') return 'декабря'
}




export const toggle = (item, setList, list, setFormToggle, formToggle) => {
  setFormToggle(!formToggle)
  setList(
    list.map(elem => {
      if(item.dateCreate === elem.dateCreate) {
        if(elem.open) {
          setFormToggle(true)
        }else {
          setFormToggle(false)
        }
        return {...elem, open: !elem.open}  
      } else {
        return {...elem, open: false}  
      }
    })
  ) 
}




export const sortComments = (arr) => {
  const sortedArr = []
  let childrenArr = []
  arr.map((item, i) => {
    if(item.parent._tree.length <= 1) {
      sortedArr.push({...item, order: i}) 
    } else {
      childrenArr.push(item)
    }
  })

  for(let i = 0; i < arr.length; i++) {
     const child = childrenArr.find(item => sortedArr[i]?._id === item?.parent?._id)
     if(child) {
      sortedArr.push({...child, order: sortedArr[i].order})
     }
     
  }

  return sortedArr.sort((a,b) => a.order - b.order)
 
  }
