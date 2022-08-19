import React from "react";
import numberFormat from '../../utils/numberFormat';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Description (props){
    console.log('Description');
    
    const cn = bem('Description');

    return(
      <div className={(cn())}>
        <div className={cn('head')}><h1>
          {props.select.title}
          </h1>
          </div>
        <div className={cn('menu')}>{props.children}</div>
      <div className={cn('content')}>
      <div className={cn('string')}>{props.select.description}</div>
      <span className={cn('string')}>
        {'Страна производитель: '}</span> 
        <span><b>{props.select.country} ({props.select.countryCode})</b></span>
      <div className={cn('string')}>
        <span>{`Категория: `}</span>
        <span><b>{props.select.category}</b></span>
      </div>
      <div className={cn('string')}>
        <span>{`Год выпуска: `}</span> 
        <span><b>{props.select.edition}</b></span>
      </div>
      <div className={cn('string')}>
        <h2>{`Цена: ${numberFormat(props.select.price)+' \u20bd'}`}</h2>
      </div>
      <button onClick={props.onAdd}>Добавить</button>
        </div>
        </div>
    )
}

export default React.memo(Description);