




import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './styles.css';
import numberFormat from "../../utils/numberFormat";

function ItemDetailInfo(props) {
  const cn = bem('ItemDetailInfo');
  
  return (
    <>
      <div className={cn()}>
        <div className={cn('content')}>
          <div className={cn('description')}>
            {props.item?.description}
          </div>
          <div className={cn('country')}>
            Страна производителя: <strong>{props.country?.title + ' ( ' + props.country?.code + ')'} </strong>
          </div>
          <div className={cn('category')}>
            Категория: <strong>{props.category?.title} </strong>
          </div>
          <div className={cn('edition')}>
            Год выпуска: <strong>{props.item?.edition} </strong>
          </div>
          <div className={cn('price')}>
            <h1>Цена: {numberFormat(props.item?.price)} ₽</h1> 
          </div>
          <button onClick={props.onAdd}>Добавить</button>
        </div>
      </div>
    </>
  )
}

export default React.memo(ItemDetailInfo);
