import React, {useCallback, useState ,useEffect} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Item(props) {
  const cn = bem('Item');

  // Счётчик выделений
  const [count, setCount] = useState(0);

  const [strNumb,setStrNumb] = useState(props.item.price);

  const callbacks = {
    onClick: useCallback(() => {
      props.onSelect(props.item.code);
      if (!props.item.selected) {
        setCount(count + 1);
      }
    }, [props.onSelect, props.item, setCount, count]),

    onAdder: useCallback((e) => {
      e.stopPropagation();
      props.onAdder(props.item)
    }, [props.onDelete,  props.item])
  };

  const spaceAdder=()=>{
    let str=props.item.price.toString();

    let strArr=[];
    for(let i=0;i<str.length;i++){
      strArr.push(str[i]);
    }
  
    if(strArr.length>3){
      let counter=0;

      for(let i=0;i<=strArr.length;i=i+3){
        if(strArr[str.length-i]){
          strArr.splice(-i-counter,0,' ');
          counter++;
        }
        
      }
      if(strArr[0]===' '){
        strArr.shift();
      }
    }
    strArr=strArr.join('')
    setStrNumb(strArr);
  }

  useEffect(()=>{
    spaceAdder();
  })
 

  return (
    <div className={cn({'selected': props.item.selected})} onClick={callbacks.onClick}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        {strNumb} ₽
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onAdder}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onSelect: propTypes.func.isRequired,
  onDeleted: propTypes.func.isRequired
}

Item.defaultProps = {
  onSelect: () => {},
  onDeleted: () => {}
}

export default React.memo(Item);
