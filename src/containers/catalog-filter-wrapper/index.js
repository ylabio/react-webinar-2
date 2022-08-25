import React from "react";
import SelectCategory from "../../components/select-category";
import SelectSorting from "../../components/select-sorting";

function valueFinder(elem, arr){
    let findElem = arr.filter(item=> item._id === elem)
    if(findElem.lenght != 0){
        return findElem
    } else {
        return arr[0]
    }
  }

function SelectWrapper(props){
     // Опции для полей
   const options = {
    sort: [
      {value:'order', title: 'По порядку', name:'order' },
      {value:'title.ru', title: 'По именованию', name:'title.ru' },
      {value:'-price', title: 'Сначала дорогие', name: '-price'},
      {value:'edition', title: 'Древние', name: 'edition'},
    ]
  }

  let resultQuery = {}

  const onChange = e => {
    resultQuery = {...resultQuery, [e.target.className] : e.target.value}
    console.log(resultQuery)

    const elems = props.options.filter(item => item.name == resultQuery.Parsing)
    console.log(!elems.lenght)
    const idString =  resultQuery.Parsing? `&search[category]=${elems[0]._id}` : ''

    const sortingString = resultQuery['Sorting']? `&sort=${resultQuery.Sorting}` : '&sort=order'
    props.onSort({sort: {idString : idString, sortingString: sortingString}})
    
  }


    return(
        <>
            <SelectCategory  value={props.options[0]} options={props.options} onChange={onChange}/>
            <SelectSorting  options={options.sort} onChange={onChange}/>
        </>
        
    )
}

export default React.memo(SelectWrapper)

