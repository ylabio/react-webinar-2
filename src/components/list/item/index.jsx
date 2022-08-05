import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Item({ item, actionBtn }) {
  const cn = bem('Item');

  return (
    <div className={cn()}>
      <div className={cn('number')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('price')}>
        {item.price.toLocaleString('ru-RU')} &#8381;
      </div>
      {item.count && <div className={cn('count')}>{item.count} шт</div>}
      <div className={cn('actions')}>{actionBtn}</div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.shape({
    title: propTypes.string,
    price: propTypes.number,
    code: propTypes.oneOfType([propTypes.string, propTypes.number]),
    count: propTypes.number.isRequired,
  }).isRequired,
  actionBtn: propTypes.element
};

 Item.defaultProps = {
   actionBtn: <button>Кнопка</button>
 }

export default React.memo(Item);

// const [count, setCount] = useState(0);
//
// const callbacks = {
//
// };
// onClick: useCallback(() => {
//   props.onSelect(props.item.code);
//   if (!props.item.selected) {
//     setCount(count + 1);
//   }
// }, [props.onSelect, props.item, setCount, count]),
//
// onDelete: useCallback(
//   (e) => {
//     e.stopPropagation();
//     props.onDelete(props.item.code);
//   },
//   [props.onDelete, props.item]
// ),

// <div className={cn({'selected': props.item.selected})} onClick={callbacks.onClick}>
//   <div className={cn('number')}>
//     {props.item.code}
//   </div>
//   <div className={cn('title')}>
//     {props.item.title}
//     {count ? ` | Выделялось ${count} ${plural(count, 'раз', 'раза', 'раз')}` : null}
//   </div>
//   <div className={cn('actions')}>
//     <button onClick={callbacks.onDelete}>
//       Удалить
//     </button>
//   </div>
// </div>

// onSelect: propTypes.func.isRequired,
// onDeleted: propTypes.func.isRequired

// Item.defaultProps = {
//   onSelect: () => {},
//   onDeleted: () => {}
// }
