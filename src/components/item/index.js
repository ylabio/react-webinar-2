import React, { useCallback } from 'react';
// хук со стейтом тоже ненужен useState ну может и нужен
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
// Пюлар тоже ненадо временно
// import plural from 'plural-ru';
import './style.css';
import Button from '../button';



function Item(props) {
  const cn = bem('Item');



  // Счётчик выделений
  // let [amount, setAmount] = useState(0);


  const callbacks = {
    onAdd: useCallback((e) => {
      e.stopPropagation();
      props.onAddBasket(props.item.code)
    }, [props.item, props.onAdd]),

    // Функция выделения тоже не нужна раз мы решили не выделять ничего
    // onClick: useCallback(() => {
    //   props.onSelect(props.item.code);
    //   if (!props.item.selected) {
    //     setCount(count + 1);
    //   }
    // }, [props.onSelect, props.item, setCount, count]),

    onDelete: useCallback((e) => {
      e.stopPropagation();
      props.onDelete(props.item.code)
    }, [props.onDelete, props.item])
  };


  // Убрал атрибут онКлик из элемента JSX с функцией выделения
  return (
    <div className={cn({ 'selected': props.item.selected })}>
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
        {/* {count ? ` | Выделялось ${count} ${plural(count, 'раз', 'раза', 'раз')}` : null} */}
        <span className={props.reUse ? 'Bad-solution' : ""}>{`${new Intl.NumberFormat().format(props.item.price)} ₽`} </span>
        {props.reUse ? <span>{props.item.amount ? props.item.amount : 1} шт</span> : ""}
      </div>
      <div className={cn('actions')}>
        {/* Заменяю удалить на добавить */}
        {props.reUse ? <Button title="Удалить" onClick={callbacks.onDelete} /> : <Button title="Добавить" onClick={callbacks.onAdd} />}
        {/* <Button title={props.reUse ? 'Удалить' : 'Добавить'} onClick={props.reUse ? callbacks.onDelete : callbacks.onAdd} /> */}
        {/* {props.reUse ? <button title="Удалить" onClick={callbacks.onDelete} /> : <button title="Добавить" onClick={callbacks.onAdd} />} */}

      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  // onSelect: propTypes.func.isRequired,
  onDeleted: propTypes.func.isRequired
}

Item.defaultProps = {
  // onSelect: () => { },
  onDeleted: () => { }
}

export default React.memo(Item);
